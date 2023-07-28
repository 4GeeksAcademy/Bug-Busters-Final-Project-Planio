from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from sqlalchemy.exc import IntegrityError
import bcrypt
import json
from datetime import datetime, timedelta

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    projects = db.relationship('Project', back_populates='user')

    def __repr__(self):
        return f'<User {self.email}>'

    def check_password(self, password):
        return bcrypt.checkpw(password.encode("UTF-8"), self.password.encode("UTF-8"))

    def validate_password(self, password):
        return len(password) >= 8

    def contains_special_character(self, password):
        special_characters = ['!', '@', '#', '$', '%', '^', '&', '*',
                              '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', ';', ':', ',', '.', '<', '>', '/', '?']

        for character in password:
            if character in special_characters:
                return True
        return False

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


#  PROJECT MODEL

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String, nullable=False)
    state = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='projects')

    def __repr__(self):
        return f'<Project {self.title}>'

    def serialize(self):
        serialized_project = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "state": self.state,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

        return serialized_project


class ProjectCollaborator(db.Model):
    __tablename__ = 'projects_Collaborators'
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_username = db.Column(db.String, db.ForeignKey(
        'users.username'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(
        'projects.id'), nullable=False)
    project_title = db.Column(db.String, db.ForeignKey(
        'projects.title'), nullable=False)

    def serialize(self):
        serialized_project_collaborator = {
            "id": self.id,
            "user_id": self.user_id,
            "user_name": self.user_name,
            "project_id": self.project_id,
            "project_title": self.project_title
        }

        return serialized_project_collaborator


class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    due_at = db.Column(
        db.DateTime, default=lambda: datetime.utcnow() + timedelta(days=3))
    done = db.Column(db.Boolean, nullable=False, default=False)
    todo_list = db.Column(db.JSON, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, todo_list=None):
        self.todo_list = json.dumps(todo_list) if todo_list else None

    def __repr__(self):
        return f'<Task {self.title}>'

    def serialize(self):
        serialized_task = {
            "id": self.id,
            "title": self.title,
            "description:": self.description,
            "due_at": self.due_at,
            "done": self.done,
            "todo_list": json.loads(self.todo_list) if self.todo_list else None,
            "created_at": self.created_at
        }

        return serialized_task
