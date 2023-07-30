import flask
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask import session

app = flask.Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.sqlite3'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(20))

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # Verificar si el usuario y la contraseña existen
    user = User.query.filter_by(username=username).first()
    if user is None:
        return flask.render_template('login.html', error='Invalid username or password.')
    if user.password != password:
        return flask.render_template('login.html', error='Invalid username or password.')

    # login usuario
    session['user'] = user.id
    return flask.redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
