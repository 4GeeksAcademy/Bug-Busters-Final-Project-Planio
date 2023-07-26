"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import or_
import bcrypt
import re


api = Blueprint('api', __name__)

# SIGN UP ENDPOINT


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
        name=name,
        last_name=last_name,
        username=username,
        email=email,
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
