from fastapi import APIRouter, HTTPException
from DataBase.connection import cursor, connection
from pydantic import BaseModel
from typing import List
from Utils.validate_functions import parseProductToJson, validateEmptyFields
from Repository.product_function import get_product_by_id_DAL, put_product_by_id_DAL, delete_product_by_id_DAL
router = APIRouter()

class Product(BaseModel):
    name: str
    description: str
    price: float
    stock: int
    id_administrator: int
    id_categories: int
    id_subcategories: int
    images: List[str]

class Categories(BaseModel):
    name: str

class Subcategories(BaseModel):
    name: str
    id_categories: int

class Images(BaseModel):
    images: list[str]

@router.get("/categories")
def get_categories():
    categories = []
    cursor.execute("SELECT * FROM categories")
    query = cursor.fetchall()
    
    for category in query:
        if category:
            category_json = {
                "id": category[0],
                "name": category[1]
            }
            categories.append(category_json)
    
    return {
        "data": categories
    }


@router.get("/subcategories")
def get_subcategories():
    subcategories = []
    cursor.execute("SELECT * FROM sub_categories")
    query = cursor.fetchall()
    
    for subcategory in query:
        if subcategory:
            subcategory_json = {
                "id": subcategory[0],
                "name": subcategory[1],
                "id_categories": subcategory[2]
            }
            subcategories.append(subcategory_json)
    
    return {
        "data": subcategories
    }

# OBTENER TODOS LOS PRODUCTOS
@router.get("/products")
def get_products():
    products = []

    cursor.execute("SELECT * FROM products")
    query = cursor.fetchall()
    
    for product in query:
        if product:
            product_json = parseProductToJson(product)
            products.append(product_json)
    
    return {
        "data": products
    }


# OBTENER PRODUCTO POR ID
@router.get("/product-by-id/{id}")
def get_product_by_id(id: int):
    try:
        if (id == ""):
            return {
                "message": "No se puede enviar el campo vacío.",
                "status_code": 400
            }
        
        result = get_product_by_id_DAL(id)

        if (result["success"] == False):
            return {
                "message": "No se encontró algún producto asociado con el ID.",
                "status_code": 404
            }
        
        if (result["success"] == True):
            return {
                "data": result["data"],
                "statusCode": 200
            }

    except Exception as e:
        return {
            "message": f"Ocurrio el error {e}",
            "status_code": 500,
        }
    


import json
@router.post("/create-product")
def create_product(product: Product):
    try:
        if validateEmptyFields(product):
            return {
                "message": "Todos los campos son obligatorios.",
                "statusCode": 400
            }
        images_json = json.dumps(product.images)
        cursor.execute("INSERT INTO products (name, description, price, stock, id_administrator, id_categories, id_subcategories, images) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
        (product.name, product.description, product.price, product.stock, product.id_administrator, product.id_categories, product.id_subcategories, images_json))
        connection.commit()
        return {
            "message": "Se ha creado el producto satisfactoriamente",
            "statusCode": 200
        }
    except Exception as e:
        return {
            "message": f"Ocurrio el error {e}",
            "status_code": 500,
        }
    

@router.put("/update-product/{id}")
def update_product(id: int, product: Product):
    try:
        if (id <= 0):
            return {
                "message": "No se puede enviar el campo vacío.",
                "statusCode": 400
            }
        
        result = get_product_by_id_DAL(id)
        print(result)
        print("Producto recibido:", product)

        if (result["success"] == False):
            return {
                "message": "No se encontró algún producto con el ID ingresado.",
                "statusCode": 404
            }
        
        product_copy = {
            "id": id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "stock": product.stock,
            "id_administrator": product.id_administrator,
            "id_categories": product.id_categories,
            "id_subcategories": product.id_subcategories,
            "images": product.images
        }
        print(product_copy)

        result_put = put_product_by_id_DAL(product_copy)

        if (result_put["success"] == False):
            return {
                "message": result_put["message"],
                "statusCode": 500
            }

        return {
            "message": result_put["message"],
            "statusCode": 200
        }
        
    except Exception as e:
        return {
            "message": f"Ocurrio el error {e}",
            "statusCode": 500,
        }
    

# ELIMINAR PRODUCTO POR ID
@router.delete("/delete-product/{id}")
def delete_product(id: int):
    try:
        if (id <= 0):
            return {
                "message": "No se puede enviar el campo vacío.",
                "statusCode": 400
            }
        
        result = get_product_by_id_DAL(id)
        print(result)

        if (result["success"] == False):
            return {
                "message": "No se encontró un producto asociado al id proporcionado.",
                "statusCode": 404
            }
        
        result_delete = delete_product_by_id_DAL(id)

        if (result_delete["success"] == False):
            return {
                "message": result_delete["message"],
                "statusCode": 500
            }

        return {
            "message": result_delete["message"],
            "statusCode": 200
        }
        
    except Exception as e:
        return {
            "message": f"Ocurrio el error {e}",
            "statusCode": 500,
        }
    

@router.get("/image")
def get_image():
    images = []
    try:
        query = cursor.execute('''
            SELECT id, name, JSON_UNQUOTE(JSON_EXTRACT(images, '$[0]')) AS first_image
            FROM products;
        ''')
        query = cursor.fetchall()

        for image in query:
            if image:
                image_json = {
                    "id": image[0],
                    "name": image[1],
                    "first_image": image[2]
                }
                images.append(image_json)
        
        return {
            "data": images
        }
    except Exception as e:
        return {
            "data": [],
            "message": f"Ocurrió el error {e}",
            "statusCode": 500
        }