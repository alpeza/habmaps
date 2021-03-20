import MQListener
import logging
import json
import traceback
import ValidateSchema as vs
logging.basicConfig(level=logging.ERROR)
class FrameParser(MQListener.Listener):
    """
    Consumidor mqtt que se encarga de parsear y almacenar
    la trama de geoposicionamiento que alimenta al mapa
    """
    def __init__(self):
        super(FrameParser, self).__init__()
        self.subscribe(self.lconfig['FrameParser']['topic'])
        logging.info("*** FRAME PARSER STARTS ***")

    def sendm(self,topic,msg):
        try:
            self.sendMessage(topic,json.dumps(msg))
        except Exception as e:
            logging.error(e)
            logging.error("Error en parseo de json para " + topic)
            logging.debug(msg)

    def broadcast(self):
        logging.info("Broadcasting ...")
        services = self.lconfig['FrameParser']['broadcast']
        # Todo el consumo de cpu :/
        for service in services:
            if service['service'] == 'status':
                self.sendm(service['topic'],self.buffer_queries.getDeviceStatus())
            elif service['service'] == 'tracespoly':
                self.sendm(service['topic'],self.buffer_queries.fetchLastNTracesPolyline(service['samples']))
            elif service['service'] == 'lastframe':
                self.sendm(service['topic'],self.buffer_queries.fetchLastTraces())

    def on_message(self,client, userdata, msg):
        logging.info("New message")
        logging.debug(msg.payload)
        try:
            # 0.- Validamos el mensaje que llega
            if vs.msg_validate(msg.payload):
                # 1.- Almacenamos la traza que ha llegado en el buffer.
                self.store(json.loads(msg.payload))
                # 2.- Realizamos las tareas de broadcasting
                self.broadcast()
            else:
                logging.warning("The message '" + str(msg.payload) + "' is invalid, please check the json structure")
        except ValueError as vex:
            logging.error('Decoding JSON has failed :(')
            traceback.print_exc()
        except Exception as e:
            traceback.print_exc()



fp=FrameParser()
fp.start()
