from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum, ForeignKey
import enum

db = SQLAlchemy()

# class Categories(enum.Enum):
#     perfumes = "perfumes"
#     accesorios = "accesorios"
#     tshirts = "tshirts"

class Role(enum.Enum):
    admin = "admin"
    buyer = "buyer"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    salt = db.Column(db.String(250), nullable=False)
    role = db.Column(db.Enum(Role), nullable=False, default ="buyer")

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
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    # categories_id= db.Column(db.Integer, nullable=False)
    user = db.relationship("User")
    cart_item= db.relationship("Cartitem", viewonly=True)
  
    # perfumes_id= db.Column(db.Integer, ForeignKey("perfumes.id"))
    # accesorios_id= db.Column(db.Integer, ForeignKey("accesorios.id"))
    # tshirts_id= db.Column(db.Integer, ForeignKey("tshirts.id"))
    # categories = db.Column("categories",Enum(Categories))

    def __repr__(self):
        return f'<Cart {self.id}'

    def serialize(self):
        items=[]
        print("serialize")
        for item in self.cart_item: 
            print("for")
            items.append({"id":item.id, "quantity":item.quantity, "tshirts_id":item.tshirts_id, "perfumes_id":item.perfumes_id, "accsesorios_id":item.accesorios_id,"cart_id":item.cart_id})
        return {
            "user_id": self.user_id,
            "id": self.id,
            "cart_item": items
            # "categories": self.categories,
            # "email": self.email


           
            # do not serialize the password, its a security breach
        }

class Perfumes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    name = db.Column(db.String(100), unique=True, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    marca = db.Column(db.String(100), unique=False, nullable=False)
    price = db.Column(db.String(100), unique=False, nullable=False)
    img_url = db.Column(db.String(100), unique=True, nullable=False)
    img_id = db.Column(db.String(120), unique=True, nullable=False)
    details = db.Column(db.String(1000), unique=False, nullable= False)


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price":self.price,
            "quantity":self.quantity,
            "marca":self.marca,
            "img_url":self.img_url,
            "img_id":self.img_id,
            "details":self.details
           
            # do not serialize the password, its a security breach
        }

class Accesorios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    name = db.Column(db.String(100), unique=True, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    marca = db.Column(db.String(100), unique=False, nullable=True)
    price = db.Column(db.String(100), unique=False, nullable=False)
    img_url = db.Column(db.String(100), unique=True, nullable=False)
    accesorios_id = db.Column(db.String(120), unique=True, nullable=False)
    details = db.Column(db.String(1000), unique=False, nullable= False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price":self.price,
            "quantity":self.quantity,
            "marca":self.marca,
            "img_url":self.img_url,
            "accesorios_id":self.accesorios_id,
            "details":self.details

           
            # do not serialize the password, its a security breach
        }
    
class Tshirts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    name = db.Column(db.String(100), unique=True, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    marca = db.Column(db.String(100), unique=False, nullable=True)
    price = db.Column(db.String(100), unique=False, nullable=False)
    size = db.Column(db.String(100), unique=False, nullable=False)
    img_url = db.Column(db.String(100), unique=True, nullable=False)
    tshirts_id = db.Column(db.String(120), unique=True, nullable=False)
    details = db.Column(db.String(1000), unique=False, nullable= False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price":self.price,
            "size":self.size,
            "quantity":self.quantity,
            "marca":self.marca,
            "img_url":self.img_url,
            "tshirts_id":self.tshirts_id,
            "details": self.details
           
            # do not serialize the password, its a security breach
        }

class Cartitem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    quantity = db.Column(db.Integer, nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey("cart.id"))
    cart= db.relationship("Cart")
    tshirts_id = db.Column(db.Integer, db.ForeignKey("tshirts.id"))
    tshirts = db.relationship("Tshirts")
    perfumes_id= db.Column(db.Integer, db.ForeignKey("perfumes.id"))
    perfumes =db.relationship("Perfumes")
    accesorios_id= db.Column(db.Integer, db.ForeignKey("accesorios.id"))
    accesorios = db.relationship("Accesorios")
    

    def __repr__(self):
        return f'<Cartitem{self.id}>'
    
    def serialize(self):
        return{
            "id":self.id,
            "quantity":self.quantity,
            "tshirts":self.tshirts,
            "perfumes":self.perfumes,
            "accesorios": self.accesorios,
            "cart_id":self.cart_id
        }