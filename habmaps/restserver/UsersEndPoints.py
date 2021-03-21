from flask import Flask, jsonify, request
from flask_restful import Resource, Api,reqparse, abort
import sys
sys.path.append('../')
import database
app = Flask(__name__)
api = Api(app)
dbh = database.db.dbHandler()
import BufferService as bs
import logging
import UsersService as us

class Login(Resource):
    """
    Endpoint para la validacion de usuarios de login
    """
    def post(self):
        logging.info("Trying to login ")
        json_data = request.get_json(force=True)
        return us.login(json_data)


class Validate(Resource):
    """
    Endpoint para la validacion de usuarios de login
    """
    def post(self):
        logging.info("Trying to login ")
        json_data = request.get_json(force=True)
        return us.validateToken(json_data)
