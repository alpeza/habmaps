from flask import Flask
from flask_restful import Resource, Api
import sys
sys.path.append('../')
import database
app = Flask(__name__)
api = Api(app)
dbh = database.db.dbHandler()
import BufferService as bs
import logging
POLYLINE_RESPONSE = {}
STATUS_RESPONSE = {}

class DataBase(Resource):
    """
    Endpoint para listar o borrar toda la
    info de una determinada tabla.
    """
    def get(self,tname):
        return bs.getAllFromTable(tname)
    def delete(self,tname):
        return bs.truncateAllFromTable(tname)

class FetchDistinct(Resource):
    """
    Retorna los distintos globos
    o estaciones base que ha encontrado
    """
    def get(self,item):
        return bs.getDistinctFieldData(item)

class FetchDataFrom(Resource):
    """
    Retorna las trazas registradas
    para una estación base o un globo
    """
    def get(self,baseballon,name):
        return bs.getTracesForBaseOrBallon(baseballon,name)


class FetchLastTraces(Resource):
    """
    Retorna las últimas trazas de cada
    estamento
    """
    def get(self):
        return bs.fetchLastTraces()

class DevicesStatus(Resource):
    """
    Retorna el status de los distintos
    dispositivos
    """
    def get(self):
        global STATUS_RESPONSE
        try:
            response = bs.getDeviceStatus()
            STATUS_RESPONSE = response
        except Exception as e:
            logging.error("*** Error al tratar de fetchear el status ***")
            logging.error(e)
        return STATUS_RESPONSE

class FetchLastNTraces(Resource):
    """
    Retorna las últimas n trazas de los distintos dispositivos
    """
    def get(self,ntraces):
        return bs.fetchLastNTraces(int(ntraces))


class FetchLastNTracesPolyline(Resource):
    """
    Retorna las últimas n trazas de los distintos dispositivos
    """
    def get(self,ntraces):
        global POLYLINE_RESPONSE
        try:
            response = bs.fetchLastNTracesPolyline(int(ntraces))
            POLYLINE_RESPONSE = response
        except Exception as e:
            logging.error("*** Error al tratar de fetchear la polyline ***")
            logging.error(e)
        return POLYLINE_RESPONSE

class RemoveTrace(Resource):
    """
    Elimina la traza de un dispositivo
    """
    def delete(self,baseballon,tname):
        global POLYLINE_RESPONSE
        try:
            return bs.removeTrace(baseballon,tname)
        except Exception as e:
            logging.error("*** Error al tratar de eliminar "+baseballon+" -> "+tname+" ***")
            logging.error(e)
