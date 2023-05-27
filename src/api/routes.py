"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
from api.utils import generate_sitemap, APIException
from base64 import b64encode
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os

api = Blueprint('api', __name__)
def set_password(password, salt):
    return generate_password_hash(f'{password}{salt}')


@api.route('/user', methods=['GET'])
def getUser():
    if request.method == 'GET':
        users = User.query.all()
        users_list = []
        for user in users:
            users_list.append(user.serialize())
        return jsonify(users_list),200
    
@api.route('/user/<int:user_id>', methods=['GET'])
def getuserby_id(user_id=None):
    if request.method == 'GET':
        user_id = User.query.filter_by(id=user_id).first()
        if user_id is None:
            return jsonify({"Message":"There's no user with that id"}),404
        else:
            return jsonify(user_id.serialize()), 200

@api.route('/register', method=['POST'])
def register():
    if request.method == 'POST':
        body = request.json
        username = body.get('username', None)
        email = body.get('email', None)
        password = body.get('password') 
        exist = User.query.filter_by(email=email, username=username).first()
        if exist is not None:
            return jsonify({"Mensaje":"Email o Nombre de usuario ya registrado"}), 400
        
        if email is None or password is None:
            return jsonify("Debes proporcionar un email o contrasena")
        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            password = set_password(password, salt)
            user = User(email=email, username=username, password=password, salt=salt)
            db.session.add(user)

            try:
                db.session.commit()
                return jsonify('Usuario ha sido creado exitosamente'), 201
            except Exception as error:
                print(error.args)
                db.session.rollback()
                return jsonify({'Message':f'error:{error.args}'}), 500
            



        




@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200