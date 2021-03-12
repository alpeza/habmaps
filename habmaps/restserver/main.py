from flask import Flask
from flask_restful import Resource, Api
import sys
sys.path.append('../')
import database
app = Flask(__name__)
api = Api(app)
# Importamos los endpoints
import BufferEndPoints

#*** BufferEndPoints ***
api.add_resource(BufferEndPoints.DataBase, '/data/<string:tname>')

if __name__ == '__main__':
    app.run(debug=True)
