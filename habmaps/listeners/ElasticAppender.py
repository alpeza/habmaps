from elasticsearch import Elasticsearch
import MQListener
import logging
import json
import schemas
import ValidateSchema as vs
logging.basicConfig(level=logging.INFO)

class ElasticAppender(MQListener.Listener):
    """Consumidor de MQTT que indexa datos en elasticsearch"""
    def __init__(self):
        super(ElasticAppender, self).__init__()
        logging.info("*** ELASTIC CONNECTOR STARTS ***")
        self.subscribe(self.shared['elasticsearch']['topic'])
        self.es = Elasticsearch([self.shared['elasticsearch']['Connection_RFC1738']])
        self.es.indices.create(index=self.shared['elasticsearch']['index'], ignore=400, body=schemas.es_mapping)
    def sendElastic(self,data):
        """Transmite lo que llega a elastic search"""
        dtts=json.loads(data)
        if dtts['type'] == 'frame':
            res = self.es.index(index=self.shared['elasticsearch']['index'], body=dtts)
            logging.info(res)

    def on_message(self,client, userdata, msg):
        logging.info("New message")
        logging.debug(msg.payload)

        if vs.msg_validate(msg.payload):
            self.sendElastic(msg.payload)
        else:
            logging.warning("The message '" + str(msg.payload) + "' is invalid, please check the json structure")

ea = ElasticAppender()
ea.start()