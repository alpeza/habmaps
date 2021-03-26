import GPXParser
import json,time,sys
import MapTracker as mtrack
from threading import Thread

def runDevice(data):
    bs = data[0]['basestation']['id']
    print("--> Started: " + bs)
    mt = mtrack.MapTracker(id="mi-estacion-base",
                       mqtt_url="18.140.68.83",
                       mqtt_port=1883)

    cou=0
    while True:
        for d in data:
            if cou == 0:
                print(d)
                cou += 1
            mt.sendMessage(d)
            time.sleep(3)

gpxp = GPXParser.GPXParser('tracks/simula1.gpx')
simulaciones = gpxp.getTracks()
#print(json.dumps(simulaciones))
for simulation in simulaciones:
    for s in simulaciones[simulation]:
        thread = Thread(target = runDevice, args = ([s]))
        thread.start()
        #thread.join()
