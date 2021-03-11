import sys
from tinydb import TinyDB, Query
sys.path.append('../')
import helpers

class dbHandler(object):
    """Gestor de la base de datos"""
    def __init__(self):
        super(dbHandler, self).__init__()
        self.conf = helpers.config.Config(file='../config.yaml').getConfig()['db']
        self.db = TinyDB(self.conf['path'])
