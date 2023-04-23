"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/user', methods=['GET'])
def getUser():
    if request.method == 'GET':
        users = User.query.filter_by().all()
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



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200