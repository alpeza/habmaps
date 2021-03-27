import paho.mqtt.client as mqtt
import sched, time, threading,os
import json,logging, traceback
from datetime import datetime, timedelta
LOGLEVEL = os.environ.get('LOGLEVEL', 'INFO').upper()
logging.basicConfig(level=LOGLEVEL)
class MapTracker(object):
    """Cliente de MQTT para maptracker"""
    def __init__(self, id="default-station-id",
                       mqtt_url="localhost",
                       mqtt_port=1883,
                       publish="hablistener",
                       alive=60,
                       user='habmaps',
                       password='root'):
        super(MapTracker, self).__init__()
        logging.info("Starting new MapTracker Client")
        self.client = mqtt.Client()
        self.client.username_pw_set(username=user,password=password)

        self.mqtt_url = mqtt_url
        self.mqtt_port = mqtt_port
        self.topic = publish
        self.id = id
        self.alive = alive

        self.s = sched.scheduler(time.time, time.sleep)

        self.alive_flag = False


    def sendAliveMessage(self):
        msg = {
            "type": "health",
             "ftime": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
             "id": self.id
        }
        logging.debug(msg)
        self.sendMessage(msg);


    def _runIamAlive(self):
        logging.info("Sending Alive Message ...")
        self.sendAliveMessage()
        self.s.enter(self.alive, 1, self._runIamAlive)
    def _runAlive(self):
        logging.info("Starting health signal ...")
        self.s.enter(self.alive, 1, self._runIamAlive)
        self.s.run()

    def startAlive(self):
        threading.Timer(1, self._runAlive).start()

    def sendMessage(self, message):
        logging.debug("sending message ...")
        try:
            self.client.connect(self.mqtt_url,self.mqtt_port,60)
            self.client.publish(self.topic, json.dumps(message));
            #self.client.disconnect();
            return 0
        except Exception as e:
            logging.error(traceback.print_exc())
            return 1
