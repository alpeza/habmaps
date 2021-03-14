from flask import Flask
from flask_restful import Resource, Api
import sys
sys.path.append('../')
import database
app = Flask(__name__)
api = Api(app)
# Importamos los endpoints
import BufferEndPoints
from flask_cors import CORS, cross_origin
#cors = CORS(app, resources={"*": {"origins": "*","methods": "*"}})
@app.after_request
def after_request(response):
    print("Enviando una respuesta al cliente ...")
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


#*** BufferEndPoints ***
api.add_resource(BufferEndPoints.DataBase, '/data/<string:tname>')
api.add_resource(BufferEndPoints.FetchDistinct, '/data/distinct/<string:item>')
api.add_resource(BufferEndPoints.FetchDataFrom, '/data/traces/<string:baseballon>/<string:name>')

api.add_resource(BufferEndPoints.FetchLastTraces, '/devices/lastframe')
api.add_resource(BufferEndPoints.DevicesStatus, '/devices/status')
api.add_resource(BufferEndPoints.FetchLastNTraces, '/devices/traces/<string:ntraces>')
api.add_resource(BufferEndPoints.FetchLastNTracesPolyline, '/devices/tracespoly/<string:ntraces>')



if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
