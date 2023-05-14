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

# Define MongoDB connection settings
uri = "mongodb+srv://teste:teste@g5-main-cluster.mamiiq8.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

app = flask.Flask(__name__)

@app.route('/get_routes', methods=['GET'])
def get_routes():
    return 1

@app.route('/get_userinfo', methods=['GET'])
def get_userinfo():
    return 1

@app.route('/user', methods=['POST'])
def add_user():
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
    mongo_collection = client["user-db"]["users"]
    mongo_collection.insert_one(user)

if __name__ == '__main__':
    app.run(port=5001)