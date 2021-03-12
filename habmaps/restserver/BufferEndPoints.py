from flask import Flask
from flask_restful import Resource, Api
import sys
sys.path.append('../')
import database
app = Flask(__name__)
api = Api(app)
dbh = database.db.dbHandler()

class DataBase(Resource):
    """
    Endpoint para listar o borrar toda la
    info de una determinada tabla.
    """
    def get(self,tname):
        table = dbh.db.table(tname)
        return table.all()
    def delete(self,tname):
        table = dbh.db.table(tname)
        return table.truncate()
