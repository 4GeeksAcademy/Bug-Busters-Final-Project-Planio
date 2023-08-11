"""empty message

<<<<<<<< HEAD:migrations/versions/32bbff7a7ed5_.py
Revision ID: 32bbff7a7ed5
Revises: 
Create Date: 2023-08-09 17:25:06.474914
========
Revision ID: bf129699dedb
Revises: 
Create Date: 2023-08-08 17:00:05.563999
>>>>>>>> 6f92d03dca1af6b02cbf0dd0bac9db534dfea821:migrations/versions/bf129699dedb_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/32bbff7a7ed5_.py
revision = '32bbff7a7ed5'
========
revision = 'bf129699dedb'
>>>>>>>> 6f92d03dca1af6b02cbf0dd0bac9db534dfea821:migrations/versions/bf129699dedb_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('projects',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('state', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('project_files', sa.ARRAY(sa.String(length=255)), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('title')
    )
    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('due_at', sa.DateTime(), nullable=True),
    sa.Column('done', sa.Boolean(), nullable=False),
    sa.Column('todo_list', sa.JSON(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('last_name', sa.String(length=80), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=128), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('recovery_token', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('recovery_token'),
    sa.UniqueConstraint('username')
    )
    op.create_table('projects_collaborators',
    sa.Column('users_id', sa.Integer(), nullable=False),
    sa.Column('projects_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['projects_id'], ['projects.id'], ),
    sa.ForeignKeyConstraint(['users_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('users_id', 'projects_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('projects_collaborators')
    op.drop_table('users')
    op.drop_table('tasks')
    op.drop_table('projects')
    # ### end Alembic commands ###