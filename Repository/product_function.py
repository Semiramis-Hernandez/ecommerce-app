from Utils.product import parseProductToJson
from DataBase.connection import cursor, connection

def get_product_by_id_DAL(id: int):
    try:
        query_text = f'SELECT p.id, p.name, p.description, p.price, p.stock, p.id_administrator, p.id_categories, p.id_subcategories, p.images FROM products p WHERE p.id = {id}'
        query = cursor.execute(query_text)
        query = cursor.fetchall()

        if (len(query) <= 0):
            return {
                "success": False,
                "data": []
            }
        
        list_product = []
        for product in query:
            product_json = parseProductToJson(product)
            list_product.append(product_json)

        return {
            "success": True,
            "data": list_product
        }

    except Exception as e:
        return {
            "success": False,
            "message": e
        }


def put_product_by_id_DAL(product):
    try:
        import json
        images_json = json.dumps(product["images"])

        query_text = f'''
        UPDATE products 
        SET name = "{product["name"]}", 
            description = "{product["description"]}", 
            price = "{product["price"]}", 
            stock = "{product["stock"]}", 
            id_administrator = "{product["id_administrator"]}", 
            id_categories = "{product["id_categories"]}", 
            id_subcategories = "{product["id_subcategories"]}", 
            images = '{images_json}'
        WHERE id = "{product["id"]}"
        '''

        cursor.execute(query_text)
        connection.commit()

        return {
            "success": True,
            "message": "Se ha actualizado el producto correctamente"
        }

    except Exception as e:
        print(f"Error durante la ejecución de la consulta: {e}")
        return {
            "success": False,
            "message": str(e)
        }


def delete_product_by_id_DAL(id: int):
    try:
        # print(product["id"])
        query_text = f'DELETE FROM products WHERE id = "{id}"'
        print(query_text)
        query = cursor.execute(query_text)
        connection.commit()

        return {
            "success": True,
            "message": "Se ha eliminado el producto correctamente"
        }
    
    except Exception as e:
        print(f"Error durante la ejecución de la consulta: {e}")
        return {
            "success": False,
            "message": str(e)
        }