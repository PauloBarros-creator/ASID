# mudar e dar pass mongodb

# meter na bd lista de rotas com paragens
#    pedido get com todas as rotas
#    pedido get com paragens de uma rota

import os, shutil, re
import json
import flask
from flask import Flask, json, jsonify
from flask import request

app = flask.Flask(__name__)

@app.route('/get_routes', methods=['GET'])
def get_routes():
    return 1

@app.route('/get_userinfo', methods=['GET'])
def get_userinfo():
    return 1


if __name__ == '__main__':
    app.run(port=5001)