from flask_sqlalchemy import SQLAlchemy
import bcrypt
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.email}>'

    def check_password(self, password):
        return bcrypt.checkpw(password.encode("UTF-8"), self.password.encode("UTF-8"))

    def serialize(self):
        serialized_user = {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "username": self.username,
            "email": self.email,
        }
        if self.created_at:
            serialized_user["created_at"] = self.created_at.strftime(
                '%d-%m-%Y %H:%M:%S')

        if self.updated_at:
            serialized_user["updated_at"] = self.updated_at.strftime(
                '%d-%m-%Y %H:%M:%S')

        return serialized_user
