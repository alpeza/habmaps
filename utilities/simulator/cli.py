import click
import paho.mqtt.client as mqtt
import time
import trackComposer
import trackComposerjson

client = mqtt.Client()

@click.command()
@click.option('--file',type=str, help='Fichero de trazas .gpx')
@click.option('--habid',type=str, help='Id del hab')
@click.option('--gstid',type=str, help='Id de la ground station')
def groundStation(file,habid,gstid):
    try:
        print("-> File: " + file)
        print("-> HAB id: " + habid)
        print("-> GST id: " + gstid)
    except Exception as e:
        print("Introduzca los valores que se especifican el help")

    tc=trackComposerjson.trackComposer(trackfile=file,id=habid,baseStation=gstid)
    messgess=tc.getTraces()
    while True:
        for msg in messgess:
            envia(msg,"broadcast")
            print("Sending:    "+msg)
            time.sleep(2)
        time.sleep(1)

def envia(message,topic):
    client.connect("localhost",1883,60)
    client.publish("hablistener", message);
    client.disconnect();





if __name__ == '__main__':
    groundStation()
