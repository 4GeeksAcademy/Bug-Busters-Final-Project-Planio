import flask
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask import session
from flask import User
import bcrypt
import json
from flask import jsonify
from flask_jwt_extended import create_access_token

app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite'
db = SQLAlchemy(app)


@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    user = User.query.filter_by(username=username).first()
    if user is None or not bcrypt.checkpw(password.encode("UTF-8"), user.password.encode("UTF-8")):
        return jsonify({'error': 'Invalid username or password.'})
    
@app.route("/token", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    # Consulta la base de datos usuario y contraseña
    user = User.filter.query(username=username, password=password).first()
    if User is None:
          # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Bad username or password"}), 401
    
    # crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })
   

    # Verificar si usuario y contraseña existen
    user = user.query.filter_by(username=username).first()
    if user is None:
        return jsonify({'error': 'Invalid username or password.'})

    if user.password != password:
        return jsonify({'error': 'Invalid username or password.'})


    # login usuario
    session['user'] = user.id
    return flask.redirect('/')


