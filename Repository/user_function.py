from Utils.validate_functions import parseUserToJson
from DataBase.connection import cursor, connection

def get_user_by_id_DAL(id: int):
    try:
        if (id <= 0):
            return {
                "success": False,
                "data": []
            }
        
        query_text = f'SELECT u.id, u.firstName, u.lastName, u.document, u.email, u.phone, u.address, u.avatar, u.password FROM users u WHERE u.id = {id}'
        query =cursor.execute(query_text)
        user = cursor.fetchone()

        if user is None:
            return {
                "success": False,
                "message": "No existe usuario asociado al ID.",
                "data": None
            }

        user_json = parseUserToJson(user)

        return {
            "success": True,
            "data": user_json
        }

    except Exception as e:
        return {
            "success": False,
            "message": f"Ocurrió un error: {str(e)}"
        }

def put_user_by_id_DAL(user):
    try:
        print(user["id"])
        query_text = f'UPDATE users SET firstName = "{user["firstName"]}", lastName = "{user["lastName"]}", phone = "{user["phone"]}", address = "{user["address"]}", avatar = "{user["avatar"]}", password = "{user["password"]}" WHERE id = "{user["id"]}"'
        print(query_text)
        query =cursor.execute(query_text)
        connection.commit()
        return {
            "success": True,
            "message": "Usuario actualizado correctamente"
        }
    except Exception as e:
        return {
            "success": False,
            "message": f"Ocurrió un error: {str(e)}"
        }
    

def delete_user_by_id_DAL(user):
    try:
        print(user["id"])
        query_text = f'DELETE FROM users WHERE id = "{user["id"]}"'
        print(query_text)
        query =cursor.execute(query_text)
        connection.commit()
        return {
            "success": True,
            "message": "Usuario eliminado correctamente"
        }
    except Exception as e:
        return {
            "success": False,
            "message": f"Ocurrió un error: {str(e)}"
        }