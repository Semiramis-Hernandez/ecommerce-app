import json
def parseProductToJson(product):
    return {
        "id": product[0],
        "name": product[1],
        "description": product[2],
        "price": product[3],
        "stock": product[4],
        "id_administrator": product[5],
        "id_categories": product[6],
        "id_subcategories": product[7],
        "images": json.loads(product[8]) if product[8] else []
    }
    

def validateEmptyFields(product):
    if product.name == "" or product.description == "" or product.price == "" or product.stock == "" or product.id_administrator == "" or product.id_categories == "" or product.id_subcategories == "" or product.images == "":
        return True
    else:
        return False

def parseUserToJson(user):
    return {
        "id": user[0],
        "firstName": user[1],
        "lastName": user[2],
        "document": user[3],
        "email": user[4],
        "phone": user[5],
        "address": user[6],
        "avatar": user[7],
        "password": user[8],
    }

# VALIDATE PARA UN REGISTRO COMPLETO
def validateEmptyFieldsUser(user):
    if user.firstName == "" or user.lastName == "" or user.document == "" or user.email == "" or user.phone == "" or user.address == "" or user.password == "":
        return False
    else:
        return True

# VALIDATE PARA UN REGISTRO PARCIAL
# def validateEmptyFieldsUser(user):
#     if user.firstName == "" or user.lastName == "" or user.email == "" or user.phone == "" or user.password == "":
#         return False
#     else:
#         return True