import os, shutil, re
import json
import flask
from flask import Flask, json, jsonify
from flask import request

app = flask.Flask(__name__)


@app.route('/get_routes', methods=['GET'])
def get_routes():
    return "sucesso"

@app.route('/get_userinfo', methods=['GET'])
def get_userinfo():
    return "sucesso"



if __name__ == '__main__':
    app.run(port=5010)