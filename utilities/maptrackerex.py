import time
# 1.- Importamos la dependencia
import MapTracker.MapTracker as mtrack
#Dependencia para generar valores simulados
import MapTracker.simsignals as ss
# 2.- Instanciamos el tracker
mt = mtrack.MapTracker(id="mi-estacion-base",
                   mqtt_url="localhost",
                   mqtt_port=1883)

# 3.- Inicializamos el HeartBeat
mt.startAlive()

# 4.- Enviamos una traza
def gettrack():
    track = {
     "type": "frame",
      "ftime": ss._fetchTime(),
      "hab":{
        "id": "mi-globo",
        "pos":{
          "lat": 10,
          "lon": 20
        },
        "payload": [
          {
            "name": "high",
            "value": ss._fetchRamp()
          },
          {
            "name": "TempInterior",
            "value": ss._getRandValue(10.0,25.0)
          },
          {
            "name": "TempExterior",
            "value": ss._getRandValue(5.0,20.0)
          },
          {
            "name": "Presion",
            "value": ss._getRandValue(5.0,20.0)
          }
        ]
      },
      "basestation":{
        "id": "mi-estacion-base",
        "pos":{
          "lat": 10,
          "lon": 20
        }
      }
    }
    return track

while True:
    print("Enviando traza")
    t=gettrack()
    print(t)
    mt.sendMessage(t)
    time.sleep(5)
