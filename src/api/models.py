from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from sqlalchemy.exc import IntegrityError
import bcrypt
import json
from datetime import datetime, timedelta

db = SQLAlchemy()

projectCollaborator = db.Table('projects_collaborators',
                               db.Column('users_id', db.Integer, db.ForeignKey(
                                   'users.id'), primary_key=True),
                               db.Column('projects_id', db.Integer, db.ForeignKey(
                                   'projects.id'), primary_key=True)
                               )


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), unique=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    recovery_token = db.Column(db.String, unique=True, nullable=True)

    projects = db.relationship(
        'Project', secondary=projectCollaborator, lazy='subquery')

    def __repr__(self):
        return f'<User {self.email}>'

    def check_password(self, password):
        return bcrypt.checkpw(password.encode("UTF-8"), self.password.encode("UTF-8"))

    def check_recovery_token(self, recovery_token):
        return bcrypt.checkpw(recovery_token.encode("UTF-8"), self.recovery_token.encode("UTF-8"))

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
            "recovery_token": self.recovery_token,
        }
        if self.created_at:
            serialized_user["created_at"] = self.created_at.strftime(
                '%d-%m-%Y %H:%M:%S')

        if self.updated_at:
            serialized_user["updated_at"] = self.updated_at.strftime(
                '%d-%m-%Y %H:%M:%S')

        serialized_user["projects"] = [project.serialize()
                                       for project in self.projects]

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

    files = db.relationship('File', backref='project', lazy=True)
    users = db.relationship(
        'User', secondary=projectCollaborator, lazy='subquery')
    tasks = db.relationship('Task', backref='project_task', lazy=True)

    def __repr__(self):
        return f'<Project {self.title}>'

    def serialize(self):
        serialized_project = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "user_ids": [user.id for user in self.users],
            "users_usernames": [user.username for user in self.users],
            "files": [file.name for file in self.files],
            "state": self.state
        }
        if self.created_at:
            serialized_project["created_at"] = self.created_at.strftime(
                '%d-%m-%Y %H:%M:%S')

        if self.updated_at:
            serialized_project["updated_at"] = self.updated_at.strftime(
                '%d-%m-%Y %H:%M:%S')

        if self.tasks:
            serialized_project["tasks"] = [task.serialize()
                                           for task in self.tasks]

        return serialized_project


class File(db.Model):
    __tablename__ = 'files'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(
        'projects.id'), nullable=False)


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

    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'),
                           nullable=False)

    def __repr__(self):
        return f'<Task {self.title}>'

    def serialize(self):
        serialized_task = {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "due_at": self.due_at.strftime(
                '%d-%m-%Y %H:%M:%S'),
            "done": self.done,
            "todo_list": self.todo_list,
            "created_at": self.created_at.strftime(
                '%d-%m-%Y %H:%M:%S'),
            "project_id": self.project_id
        }

        return serialized_task
