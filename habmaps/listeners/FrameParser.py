import MQListener
import logging
import json
import traceback
class FrameParser(MQListener.Listener):
    """
    Consumidor mqtt que se encarga de parsear y almacenar
    la trama de geoposicionamiento que alimenta al mapa
    """
    def __init__(self):
        super(FrameParser, self).__init__()
        self.subscribe(self.lconfig['FrameParser']['topic'])

    def on_message(self,client, userdata, msg):
        logging.debug("New message:")
        logging.debug(msg.payload)
        try:
            # Almacenamos la traza que ha llegado en el buffer.
            self.store(json.loads(msg.payload))
        except ValueError as vex:
            logging.error('Decoding JSON has failed :(')
            traceback.print_exc()
        except Exception as e:
            traceback.print_exc()


fp=FrameParser()
fp.start()
