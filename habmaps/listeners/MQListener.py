import paho.mqtt.client as mqtt
import logging
import sys
sys.path.append('../')
import helpers
import database

class Listener(object):
    """Clase wrapper para el listener de mqtt y persistencia de datos"""
    def __init__(self):
        super(Listener, self).__init__()
        self.client = mqtt.Client()
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        #Cargamos la configuración del cliente
        self.lconfig = helpers.config.Config(file='../config.yaml').getConfig()['listeners']
        self.config = helpers.config.Config(file='../config.yaml').getConfig()['mqtt']
        self.client.connect(self.config['url'], self.config['port'], 60)
        # Inicializamos la base de datos
        self.dbh = database.db.dbHandler()
        self.whoami = self.whoami()

    def whoami(self):
        return type(self).__name__

    def store(self,dictmessage):
        """ Almacena en base de datos un mensaje """
        table = self.dbh.db.table(self.whoami)
        table.insert(dictmessage)

    def subscribe(self,topic):
        logging.debug("Subscribiendose a  " + topic)
        self.client.subscribe(topic)

    def on_connect(self,client, userdata, flags, rc):
        pass

    def on_message(self,client, userdata, msg):
        pass

    def start(self):
        logging.info("Se inicia el lístener")
        self.client.loop_forever()
