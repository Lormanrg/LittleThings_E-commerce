"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Tshirts, Perfumes, Accesorios, Cart
from werkzeug.security import generate_password_hash, check_password_hash
from api.utils import generate_sitemap, APIException
from base64 import b64encode
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
import cloudinary.uploader as uploader

api = Blueprint('api', __name__)
def set_password(password, salt):
    return generate_password_hash(f'{password}{salt}')

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f'{password}{salt}')


@api.route('/user', methods=['GET'])
def getUser():
    if request.method == 'GET':
        users = User.query.all()
        users_list = []
        for user in users:
            users_list.append(user.serialize())
        return jsonify(users_list),200
    

@api.route('/cart', methods=['GET'])
@jwt_required()
def getCart():
    if request.method == 'GET':
        user_id = get_jwt_identity() 
        carts = Cart.query.filter_by(user_id=user_id).first()
        print(carts)
        return jsonify(carts.serialize()),200
    
@api.route('/user/<int:user_id>', methods=['GET'])
def getuserby_id(user_id=None):
    if request.method == 'GET':
        user_id = User.query.filter_by(id=user_id).first()
        if user_id is None:
            return jsonify({"Message":"There's no user with that id"}),404
        else:
            return jsonify(user_id.serialize()), 200

@api.route('/register', methods=['POST'])
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
            
@api.route('/login', methods=['POST'])
def handle_login():
    if request.method == 'POST':
        body = request.json
        username = body.get('username', None)
        email = body.get ('email', None)
        password = body.get('password', None)

        if username is None or email is None or password is None:
            return jsonify ("Debe proporcionar usuario, email y clave para completar su registro")
        else:
            login = User.query.filter_by(email=email).one_or_none()

            if login is None:
                return jsonify({"Mensaje":"Email no existe"}),400
            else:
                if check_password(login.password, password, login.salt):
                    token = create_access_token(identity=login.id)
                    return jsonify ({"token": token}), 201
                else:
                    return jsonify ({"Mensaje":"Email no existe"}),400
                
@api.route('/tshirts', methods=['GET'])
def getting_tshirts():
    if request.method == 'GET':
        tshirts= Tshirts.query.all()
        tshirts_list = []
        for tshirt in tshirts:
            tshirts_list.append(tshirt.serialize())

        return jsonify(tshirts_list), 200
    
@api.route('/perfumes', methods=['GET'])
def getting_perfumes():
    if request.method == 'GET':
        perfumes= Perfumes.query.all()
        perfumes_list= []
        for perfume in perfumes:
            perfumes_list.append(perfume.serialize())

        return jsonify(perfumes_list), 200
    
@api.route('/accesorios', methods=['GET'])
def getting_accesorios():
    if request.method == 'GET':
        accesorios = Accesorios.query.all()
        accesorios_list= []
        for accesorio in accesorios:
            accesorios_list.append(accesorio.serialize())

    return jsonify(accesorios_list), 200

@api.route('/perfumes/<int:id>', methods=['DELETE'])
def delete_perfume(id=None):
    if id is None:
        return jsonify({"Message": "Perfume id is required"}), 400
    
    perfumes = Perfumes.query.get(id)

    if perfumes is None:
        return jsonify({"Message":"Perfume hasn't been found"}), 404
    
    try:
        cloudinary_delete= uploader.destroy(perfumes.img_id)
        print (cloudinary_delete)

        if cloudinary_delete['result'] != 'ok':
            return jsonify ({"message":"Error deleting Cloudinary"})
        
        db.session.delete(perfumes)
        db.session.commit()
        return jsonify ({"Message":"Perfumes images have been deleted successfully"}), 204
    except Exception as error:
        return jsonify({"error":error.args}), 500

@api.route('/perfumes', methods=['POST'])
def upload_perfumesurl():
    if request.method== 'POST':
        image_file= request.files['file']
        name = request.form.get('name')
        quantity_body = request.form.get('quantity')
        marca_body = request.form.get('marca')
        price_body = request.form.get('price')
 

        if name is None:
            return jsonify('All the fields are required'),400
        try:
            c_upload = uploader.upload(image_file)
            new_perfume = Perfumes(name=name, img_url=c_upload["url"], img_id=c_upload['public_id'],quantity=quantity_body, marca=marca_body, price= price_body )
            db.session.add(new_perfume)
            db.session.commit()

            return jsonify(new_perfume.serialize()),201

        except Exception as error:
            db.session.rollback()
            return jsonify({"message":error.args}), 500
        
# Crear rutas para postear tshirts y accesorios
        
@api.route('tshirts', methods=['POST'])
def upload_tshirtsurl():
    if request.method == 'POST':
        image_file = request.files['file']
        name = request.form.get('name')
        quantity_body= request.form.get('quantity')
        marca_body= request.form.get('marca')
        price_body= request.form.get('price')
        size_body = request.form.get('size')
        details_body = request.form.get('details')

        if name is None:
            return jsonify('All fields are required'), 400
        
        try:
            c_upload = uploader.upload(image_file)
            new_tshirt = Tshirts(name=name, img_url=c_upload["url"], tshirts_id=c_upload['public_id'], quantity=quantity_body, marca=marca_body, price= price_body, size= size_body, details= details_body )
            db.session.add(new_tshirt)
            db.session.commit()

            return jsonify(new_tshirt.serialize()), 201
        
        except Exception as error:
            db.session.rollback()
            return jsonify({"message":error.args}), 500

@api.route('accesorios', methods=['POST'])
def upload_accesoriosurl():
    if request.method== 'POST':
        image_file = request.files['file']
        name = request.form.get('name')
        quantity_body = request.form.get('quantity')
        marca_body = request.form.get('marca')
        price_body = request.form.get('price')

        if name is None:
            return jsonify("All fields are required"), 400
        
        try:
            c_upload = uploader.upload(image_file)
            new_accesory= Accesorios(name=name, img_url=c_upload['url'], accesorios_id=c_upload['public_id'], quantity= quantity_body, marca=marca_body, price=price_body)
            db.session.add(new_accesory)
            db.session.commit()

            return jsonify(new_accesory.serialize()), 201
        
        except Exception as error:
            db.session.rollback()
            return jsonify({"message":error.args}), 400       













        




@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200