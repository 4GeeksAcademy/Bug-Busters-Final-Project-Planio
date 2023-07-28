"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask import render_template
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)


@api.route('/login', methods=['POST'])
def login():

    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username, password=password).first()
    if user is None:
        raise APIException('Invalid username or password', 401)

    token = create_access_token(identity=user.id)
    return jsonify({'message': 'Successfully logged in'}), 200

    return jsonify({"token": access_token, "user_id": user.id})
