from flask import Flask, jsonify, request
from flask_restful import Resource, Api,reqparse, abort
import sys
sys.path.append('../')
app = Flask(__name__)
api = Api(app)
import logging
import ConfService as cs


class Configurations(Resource):
    """
    Endpoint para la modificación de la configuración
    """
    def get(self):
        logging.info("Checking the shared configurations")
        return cs.getConf()
    def put(self):
        logging.info("Updating config")
        try:
            return cs.updateConf(request.get_json(force=True))
        except Exception as e:
            logging.error("Error updating confs ...")
            logging.error(e)

class ConfigurationsSchema(Resource):
    """
    Endpoint para la modificación de la configuración
    """
    def get(self):
        logging.info("Checking the shared schema configurations")
        return cs.getConfSchema()

class ConfigurationsPropertie(Resource):
    """
    Endpoint para la modificación de la configuración
    """
    def get(self,propertie):
        logging.info("Checking the shared schema configurations")
        return cs.getConf()[propertie]

