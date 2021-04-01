from habmapspy import MapTracker

# Instanciamos el cliente
mt = MapTracker.MapTracker(id="default-station-id", #Base station name
                           mqtt_url="localhost",    #Habmaps mqtt url
                           mqtt_port=1883,          #Habmaps mqtt port
                           user='habmaps',          #Habmaps user
                           password='root')         #Habmaps password

# 1.- Anadimos las trazas del globo [Lat,Lon]
mt.addHabPos([1.2,3.5])
mt.addTimeStamp('12/12/12 ')
# 2.- Anadimos las trazas de los distintos sensores
mt.add_signal('sensor',12.5)
mt.add_signal('sensor',12.5)
mt.add_signal('sensor',12.5)
# 3.- Opcional: Anadimos la posicion de la estación base [Lat,Lon]
mt.addBaseStationPos([1.2,3.5])
# 4.- Enviamos el mensaje
mt.send()