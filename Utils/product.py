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