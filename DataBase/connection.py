import mysql.connector

connection = mysql.connector.connect(
    user="root",
    host="localhost",
    password="12345",
    database="dbclotingstore",
    port="3306"
)

cursor = connection.cursor()