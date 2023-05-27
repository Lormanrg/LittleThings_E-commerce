from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum, ForeignKey
import enum

db = SQLAlchemy()

class Categories(enum.Enum):
    perfumes = "perfumes"
    accesorios = "accesorios"
    tshirts = "tshirts"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    salt = db.Column(db.String(250), nullable=False)
    cart= db.relationship("Cart", backref="user", lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,

            # do not serialize the password, its a security breach
        }
    
class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("user.id"))
    categories_id= db.Column(db.Integer, nullable=False)
    perfumes_id= db.Column(db.Integer, ForeignKey("perfumes.id"))
    accesorios_id= db.Column(db.Integer, ForeignKey("accesorios.id"))
    tshirts_id= db.Column(db.Integer, ForeignKey("tshirts.id"))
    categories = db.Column("categories",Enum(Categories))

    def serialize(self):
        return {
            "id": self.id,
            "categories": self.categories,
           
            # do not serialize the password, its a security breach
        }

class Perfumes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    price = db.Column(db.String(100), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price":self.price
           
            # do not serialize the password, its a security breach
        }

class Accesorios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    price = db.Column(db.String(100), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price":self.price
           
            # do not serialize the password, its a security breach
        }
    
class Tshirts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    price = db.Column(db.String(100), unique=False, nullable=False)
    size = db.Column(db.String(100), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price":self.price,
            "size":self.size
           
            # do not serialize the password, its a security breach
        }