from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from DataBase.connection import cursor, connection
from Repository.user_function import get_user_by_id_DAL, put_user_by_id_DAL, delete_user_by_id_DAL
from Utils.validate_functions import validateEmptyFieldsUser

router = APIRouter()

class Administrator(BaseModel):
    firstName: str
    lastName: str
    email: str
    avatar: str
    password: str


class User(BaseModel):
    firstName: str
    lastName: str
    document: str
    email: str
    phone: str
    address: str
    avatar: str
    password: str


class LoginModel(BaseModel):
    email: str
    password: str

@router.get("/users")
def get_users():
    users = []
    try:
        query = cursor.execute("SELECT * FROM users")
        users_query = cursor.fetchall()
        for user in users_query:
            user_dict = {
                "id": user[0],
                "firstName": user[1],
                "lastName": user[2],
                "document": user[4],
                "email": user[8],
                "phone": user[5],
                "address": user[6],
                "avatar": user[7],
                "password": user[3],
            }
            users.append(user_dict)
    except Exception as e:
        return {
            "message": f"Ocurrió un error: {str(e)}",
            "statusCode": 500
        }
    return {"data": users, "statusCode": 200}

@router.get ("/user-by-id/{user_id}")
def get_user_by_id(user_id: int):
    try:
        if (id == ""):
            return {
                "message": "El ID es obligatorio.",
                "statusCode": 400
            }

        result = get_user_by_id_DAL(user_id)
        print(result)

        if (result["success"] == False):
            return {
                "message": "No existe algún usuario registrado con el Id.",
                "statusCode": 400
            }
        
        if (result["success"] == True):
            return {
                "data": result["data"],
                "statusCode": 200
            }
        
    except Exception as e:
        return {
            "message": f"Ocurrió un error: {str(e)}",
            "statusCode": 500
        }


# PETICIÓN PARA UN REGISTRO COMPLETO
@router.post("/create-user")
def create_user(user: User):
    try:
        if (validateEmptyFieldsUser(user)):
            
            query_text = f'INSERT INTO users (firstName, lastName, document, email, phone, address, avatar, password) VALUES ("{user.firstName}", "{user.lastName}", "{user.document}", "{user.email}", "{user.phone}", "{user.address}", "{user.avatar}", "{user.password}")'
            query =cursor.execute(query_text)
            connection.commit()
        else:
            return {
                "message": "Todos los campos son obligatorios.",
                "statusCode": 400
            }
        return {
            "message": "Usuario registrado correctamente",
            "statusCode": 200
        }
    except Exception as e:
        return {
            "message": f"Ocurrió un error: {str(e)}",
            "statusCode": 500
        }

@router.put("/user/{user_id}")
def update_user(id: int, user: User):
    try:
        if (id <= 0):
            return {
                "message": "El id es obligatorio",
                "statusCode": 400
            }
        
        result = get_user_by_id_DAL(id)
        print(result)

        if (result["success"] == False):
            return {
                "message": "No existe un usuario asociado al ID.",
                "statusCode": 404
            }
        
        user_copy = {
            "id": id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "document": user.document,
            "email": user.email,
            "phone": user.phone,
            "address": user.address,
            "avatar": user.avatar,
            "password": user.password
        }
        
        result_put = put_user_by_id_DAL(user_copy)

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
    

@router.delete("/user/{user_id}")
def delete_user(id: int):
    try:
        if (id == ""):
            return {
                "message": "El id es obligatorio",
                "statusCode": 400
            }
        
        result = get_user_by_id_DAL(id)
        print(result)

        if (result["success"] == False):
            return {
                "message": "No existe un usuario asociado al ID.",
                "statusCode": 404
            }
        
        result_delete = delete_user_by_id_DAL(result["data"])

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


@router.post("/login")
async def login(login_info: LoginModel):
    try:

        cursor.execute(f'SELECT * FROM users WHERE email = "{login_info.email}"')
        user_query = cursor.fetchone()

        if user_query:
            if user_query[3] == login_info.password:
                user_login = {
                    "id": user_query[0],
                    "firstName": user_query[1],
                    "lastName": user_query[2],
                    "document": user_query[4],
                    "phone": user_query[5],
                    "address": user_query[6],
                    "avatar": user_query[7],
                    "email": user_query[8],
                    "role": "User"
                }
                return {
                    "message": "Ha iniciado sesión con éxito.",
                    "data": user_login,
                    # "type_user": "User",
                    "statusCode": 200
                }
            else:
                return {
                    "message": "La contraseña es incorrecta.",
                    "statusCode": 400
                }


        cursor.execute(f'SELECT * FROM administrator WHERE email = "{login_info.email}"')
        admin_query = cursor.fetchone()

        if admin_query:
            if admin_query[5] == login_info.password:
                admin_login = {
                    "id": admin_query[0],
                    "firstName": admin_query[1],
                    "lastName": admin_query[2],
                    "email": admin_query[3],
                    "avatar": admin_query[4],
                    "role": "Admin"
                }
                return {
                    "message": "Ha iniciado sesión como administrador.",
                    "data": admin_login,
                    # "type_user": "Admin",
                    "statusCode": 200
                }
            else:
                return {
                    "message": "La contraseña es incorrecta.",
                    "statusCode": 400
                }

        return {
            "message": "El correo no existe.",
            "statusCode": 400
        }

    except Exception as e:
        return {
            "message": f"Ocurrió un error: {e}",
            "statusCode": 500
        }
    

