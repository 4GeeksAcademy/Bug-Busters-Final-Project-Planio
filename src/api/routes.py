"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, render_template, render_template_string, redirect, abort
from api.models import db, User, Project, File, Task
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import or_
import bcrypt
import re
import random
from flask_mail import Mail, Message
import os
from api.mail import mail
import boto3
import botocore
from botocore.exceptions import NoCredentialsError
from botocore.config import Config
from flaskMailTemplate import mail_template

api = Blueprint('api', __name__)

# SIGNUP/LOGIN ROUTES ------------------------------------------------------------------------------------------------------SIGNUP/LOGIN ROUTES #


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


# PASSWORD ROUTES ------------------------------------------------------------------------------------------------------PASSWORD ROUTES #


@api.route('/forgot-password', methods=['POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.json.get('email')

    user = User.query.filter_by(email=email).first()
    if user is None:
        abort(404, description='User not found')

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
            recipients=[user.email]
        )
        recovery_url = f"{os.getenv('FRONTEND_URL')}reset-password/{user.id}"
        msg.html = render_template_string(
            mail_template, user_name=user.name, url=recovery_url, recovery_token=recovery_token)
        try:
            mail.send(msg)
            return 'Correo electrónico enviado correctamente.'
        except Exception as e:
            return f'Error al enviar el correo electrónico: {str(e)}'

    enviar_correo()
    db.session.commit()

    return jsonify({"msg": "Se ha enviado un enlace de recuperación a su dirección de correo electrónico.", "user_id": user.id}), 200


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


# PRIVATE VIEWS ROUTES ------------------------------------------------------------------------------------------------------PRIVATE VIEWS ROUTES #


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
        "projects": serialized_projects,
        "username": user.username,

    }

    return jsonify(response), 200


# MANIPULATE USERS ROUTES ------------------------------------------------------------------------------------------------------MANIPULATE USERS ROUTES #

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


@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user_to_delete = User.query.get(user_id)

    if user_to_delete:
        db.session.delete(user_to_delete)
        db.session.commit()
        return jsonify({"msg": "User successfully deleted."}), 200
    else:
        return jsonify({"msg": "User not found."}), 404


# PROJECT ROUTES ------------------------------------------------------------------------------------------------------PROJECT ROUTES #


@api.route('/create-new-project', methods=['POST'])
def create_new_project():
    title = request.json.get('title')
    description = request.json.get('description')
    users = request.json.get('users', [])

    project = Project(
        title=title.title(),
        description=description.capitalize()
    )
    db.session.add(project)

    users = User.query.filter(User.username.in_(users)).all()
    project.users.extend(users)
    db.session.commit()

    return jsonify({"message": "Project created successfully", "project": project.serialize()}), 201


@api.route('/projects', methods=['GET'])
def get_all_projects():
    projects = Project.query.all()

    all_projects = [project.serialize() for project in projects]

    return jsonify(all_projects), 200

# AWS ROUTES ------------------------------------------------------------------------------------------------------AWS ROUTES #


aws_config = Config(
    region_name='eu-west-3',
    signature_version='v4',
    retries={
        'max_attempts': 10,
        'mode': 'standard'
    }
)

s3 = boto3.client('s3', aws_access_key_id=os.getenv(
    "ACCESS_KEY"), aws_secret_access_key=os.getenv("SECRET_KEY"), config=aws_config)


@api.route('/upload/<int:project_id>', methods=['POST'])
def upload_file(project_id):

    if 'file' not in request.files:
        return jsonify({"error": "You didn't sent any file."}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Wrong file name."}), 400

    try:
        content_disposition = 'inline; filename="{}"'.format(file.filename)
        folder_name = 'images'
        file_key = folder_name + '/' + file.filename
        s3.upload_fileobj(file, os.getenv("BUCKET_NAME"), file.filename, ExtraArgs={
            'ContentType': file.content_type,
            'ContentDisposition': content_disposition
        })

        project = Project.query.get(project_id)
        file = File(name=file.filename, project=project)
        db.session.add(file)
        db.session.commit()

        return jsonify({"message": "File uploaded!"}), 200
    except Exception as exception:
        return jsonify({"error": str(exception)}), 500


@api.route('/delete-file', methods=['DELETE'])
def delete_file():
    try:
        bucket_name = os.getenv("BUCKET_NAME")
        file_name = request.json.get('file_name')
        project_id = request.json.get('project_id')
        project = Project.query.get(project_id)

        file_instance = File.query.filter_by(
            name=file_name, project_id=project_id).first()
        if file_instance:
            db.session.delete(file_instance)
        db.session.flush()
        db.session.commit()
        print("Received file name:", file_name)
        s3.delete_object(Bucket=bucket_name, Key=file_name)
        new_serialized_project = project.serialize()

        return jsonify({'msg': 'File has been successfully deleted from AWS and from the project', 'project': new_serialized_project}), 200
    except NoCredentialsError:
        return jsonify({'error': 'AWS credentials not found'}), 500


# TASK ENDPOINTS -----------------------------------------------------------------------TASK ENDPOINTS #

@api.route('/task', methods=["POST"])
def create_task():

    title = request.json.get('title')
    description = request.json.get('description')
    due_at = request.json.get('due_at')
    todo_list = request.json.get('todo_list', [])
    project_id = request.json.get('project_id')

    task = Task(
        title=title.title(),
        description=description.capitalize(),
        due_at=due_at,
        todo_list=todo_list,
        project_id=project_id
    )

    db.session.add(task)
    db.session.commit()

    return jsonify({"message": "Task successfully created", "task": task.serialize()}), 201


@api.route('/task/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task_to_delete = Task.query.get(task_id)

    if task_to_delete:
        db.session.delete(task_to_delete)
        db.session.commit()
        return jsonify({"msg": "Task successfully deleted."}), 200
    else:
        return jsonify({"msg": "Task not found."}), 404
