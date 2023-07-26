"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/login', methods=['POST', 'GET'])
def login():

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

    user = User.query.filter_by(username=username).first()
    if user is None or not user.check_password(password):
        raise APIException('Invalid username or password', 401)

        login_user(user)
    return jsonify({'message': 'Successfully logged in'}), 200


@api.route('/signup', methods=['GET', 'POST'])
def signup():

    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        if User.query.filter_by(username=username).first() is not None:
            raise APIException('Username already exists', 409)

        if User.query.filter_by(email=email).first() is not None:
            raise APIException('Email already exists', 409)

        user = User(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'Successfully created user'}), 201

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
