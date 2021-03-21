from flask import Flask, jsonify, request
from flask_restful import Resource, Api,reqparse, abort
import sys
sys.path.append('../')
app = Flask(__name__)
api = Api(app)
import logging
import ProcService as ps

class List(Resource):
    """
    Endpoint para la validacion de usuarios de login
    """
    def get(self):
        logging.info("Trying to get tasks ")
        return ps.getTasks()


class Action(Resource):
    """
    Endpoint para la validacion de usuarios de login
    """
    def put(self,action,id):
        logging.info("Trying to do " + action + " over " + id)
        return ps.manageTask(id,action)
