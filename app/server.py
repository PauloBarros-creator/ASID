# mudar e dar pass mongodb

# meter na bd lista de rotas com paragens
#    pedido get com todas as rotas
#    pedido get com paragens de uma rota

import os, shutil, re
import json
import flask
from flask import Flask, json, jsonify
from flask import request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo import DESCENDING

# Define MongoDB connection settings
#uri = "mongodb+srv://teste:teste@g5-main-cluster.mamiiq8.mongodb.net/?retryWrites=true&w=majority"
#uri = "mongodb+srv://teste:<password>@g5-main-cluster.mamiiq8.mongodb.net/?retryWrites=true&w=majority"
uri = "mongodb+srv://teste:teste@g5-main-cluster.mamiiq8.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

app = flask.Flask(__name__)


@app.route('/sensors', methods=['GET'])
def get_sensor_info():
    mongo_collection = client["bus-db"]["sensors"]
    
    newest_document = mongo_collection.find_one(sort=[("_id", DESCENDING)])

    if newest_document is None:
        return jsonify({})  # Return an empty response if no documents are found

    sensor_info = {
        'Rota': newest_document['Rota'],
        'Origem': newest_document['Origem'],
        "Destino": newest_document['Destino'],
        "Velocidade": newest_document['Velocidade'],
        "Temperatura": newest_document['Temperatura'],
        "N Passageiros": newest_document['N Passageiros'],
        "Latitude": newest_document['Latitude'],
        "Longitude": newest_document['Longitude']
    }
    
    return jsonify(sensor_info)

@app.route('/routes', methods=['GET'])
def get_routes():
    routes = []
    mongo_collection = client["bus-db"]["routes"]
    for route in mongo_collection.find():
        routes.append({
            'start': route['start'],
            'end': route['end']
        })
    return jsonify(routes)

@app.route('/user', methods=['GET','POST'])
def add_user():
    if request.method == 'POST':
        # Extract user information from the request
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        age = request.form.get('age')

        # Create a new user document
        user = {
            'name': name,
            'email': email,
            'phone': phone,
            'age': age
        }

        # set database and collection to post to - then post
        mongo_collection = client["users-db"]["users"]
        mongo_collection.insert_one(user)
        return ("200 OK")
    else:
        users = []
        mongo_collection = client["user-db"]["users"]
        for user in mongo_collection.find():
            users.append({
                'name': user['name'],
                'email': user['email'],
                'phone': phone,
                'age': user['age']
            })
        return jsonify(users)

if __name__ == '__main__':
    app.run(port=5000)