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

@app.route('/teste', methods=['GET'])
def teste():
    teste = "teste"
    return teste

@app.route('/routes', methods=['GET'])
def get_routes():
    routes = []
    mongo_collection = client["bus-db"]["routes"]
    for route in mongo_collection.find():
        routes.append({
            routes.append(route['title'])
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
        mongo_collection = client["user-db"]["users"]
        mongo_collection.insert_one(user)
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
    app.run(port=5010)