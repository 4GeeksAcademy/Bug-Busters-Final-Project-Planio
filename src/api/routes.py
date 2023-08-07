"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, render_template, redirect, abort
from api.models import db, User, Project
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import or_
import bcrypt
import re
import random
from flask_mail import Mail, Message
import os
from api.mail import mail

api = Blueprint('api', __name__)

# SIGN UP ENDPOINT


@api.route('/login', methods=['POST'])
def login():

    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter_by(email=email).first()

    validated_password = user.check_password(
        password)

    if user is None:
        return abort(404, description='User does not exist')

    if not validated_password:
        return abort(404, description='Something went wrong')

    token = create_access_token(identity=user.id)
    return jsonify({"token": token, "user_id": user.id}), 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    projects = user.projects

    serialized_projects = [project.serialize() for project in projects]

    response = {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "projects": serialized_projects
    }

    return jsonify(response), 200


@api.route('/signup', methods=['POST'])
def sign_up_user():
    name = request.json.get('name')
    last_name = request.json.get('last_name')
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    created_at = request.json.get('created_at')
    updated_at = request.json.get('updated_at')

    password_hash = bcrypt.hashpw(password.encode("UTF-8"), bcrypt.gensalt())

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"msg": "Invalid email address."}), 400

    user = User(
        name=name.title(),
        last_name=last_name.title(),
        username=username.lower(),
        email=email.lower(),
        password=password_hash.decode("UTF-8"),
        created_at=created_at,
        updated_at=updated_at
    )

    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=user.id)

    response_body = {
        "msg": "User succesfully created.",
        "user": user.serialize(),
        "token": token
    }
    return jsonify(response_body), 201


# GET USERS ENDPOINT

@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()

    all_users = [user.serialize() for user in users]

    return jsonify(all_users), 200


@api.route('/user/<int:user_id>', methods=['GET'])
def get_selected_user(user_id):
    user = User.query.get(user_id)

    selected_user = user.serialize()

    return jsonify(selected_user), 200

# EDIT USER ENDPOINT


@api.route('/user/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    user = User.query.get(user_id)
    data = request.json

    if 'name' in data:
        user.name = data['name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']

    db.session.commit()

    return jsonify({"msg": "User successfully updated.", "user": user.serialize()}), 200


#  DELETE USER ENDPOINT

@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user_to_delete = User.query.get(user_id)

    if user_to_delete:
        db.session.delete(user_to_delete)
        db.session.commit()
        return jsonify({"msg": "User successfully deleted."}), 200
    else:
        return jsonify({"msg": "User not found."}), 404


# FORGOT PASSWORD ENDPOINT

@api.route('/forgot-password', methods=['POST'])
def forgot_password():
    # Verificamos que el usuario existe
    if request.method == 'POST':
        email = request.json.get('email')

    user = User.query.filter_by(email=email).first()
    if user is None:
        abort(404, description='User not found')

    # #Creamos el token
    # token = create_access_token(identity=user.id)

    # Crear número aleatorio
    def generar_numero_aleatorio():
        return str(random.randint(100000, 999999))

    recovery_token = generar_numero_aleatorio()

    encrypted_token = bcrypt.hashpw(
        recovery_token.encode("UTF-8"), bcrypt.gensalt())

    user.recovery_token = encrypted_token.decode("UTF-8")

    def enviar_correo():
        msg = Message(
            subject=("Your recovery code"),
            sender="planio.notification@gmail.com",
            recipients=[user.email],
            body=(
                f" Hi {user.name}! your recovery code is: {recovery_token}.\n {os.getenv('FRONTEND_URL')}reset-password/{user.id}")
        )
        try:
            mail.send(msg)
            return 'Correo electrónico enviado correctamente.'
        except Exception as e:
            return f'Error al enviar el correo electrónico: {str(e)}'

    enviar_correo()
    db.session.commit()

    return jsonify({"msg": "Se ha enviado un enlace de recuperación a su dirección de correo electrónico.", "user_id": user.id}), 200


# RESET PASSWORD ENDPOINT
@api.route('/reset-password/<int:id>', methods=['POST'])
def reset_password(id):
    user = User.query.filter_by(id=id).first()

    new_password = request.json.get('new_password')
    recovery_token = request.json.get('recovery_token')

    recovery_token_validated = user.check_recovery_token(
        recovery_token)

    if user is None:
        return abort(404, description='User not found')

    if not recovery_token_validated:
        return abort(404, description='Something went wrong')

    hashed_password = bcrypt.hashpw(
        new_password.encode('utf-8'), bcrypt.gensalt())

    user.password = hashed_password.decode('utf-8')

    print(user.password)

    db.session.commit()

    return jsonify({"msg": "Password successfully updated"})


#    PROJECTS ENDPOINTS

# Create new Project endpoint
@api.route('/create-new-project', methods=['POST'])
def create_new_project():
    title = request.json.get('title')
    description = request.json.get('description')
    # Convert single user ID to a list
    users = request.json.get('users', [])

    project = Project(
        title=title.title(),
        description=description.capitalize()
    )
    db.session.add(project)

    users = User.query.filter(User.id.in_(users)).all()
    project.users.extend(users)
    db.session.commit()

    return jsonify({"message": "Project created successfully", "project": project.serialize()}), 201
