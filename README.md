# HABMaps

![](habmaps/uiserver/src/assets/img/brand/argon-react-white.png)

Utilidad para el seguimiento por gps

# Quick Start

1.- Descargamos el repositorio
``` 
git clone https://github.com/alpeza/habmaps.git
cd habmaps
```

2.- Deployamos

```
docker-compose up -d
```

> Para descargar en una EC2 de Amazon puede seguir las siguientes [instrucciones](EC2Deploy/README.md)

## Protocolo

### HeartBeat

```json
{
  "type": "health",
  "ftime": "asdf",
  "id": "asdf"
}
```


### Trama

```json
{
  "type": "frame",
  "ftime": "asdf",
  "hab":{
    "id": 1,
    "pos":{
      "lat": 20,
      "lon": 10
    },
    "payload": [
      {
        "name": "mysignal1",
        "value": 12.5
      },
      {
        "name": "mysignal2",
        "value": 12.5
      }
    ]
  },
  "basestation":{
    "id": 1,
    "pos":{
      "lat": 10,
      "lon": 20
    }
  }
}
```


-----------
Lat: 41.4499321, Long: 2.2233582
https://www.google.com/maps/search/?api=1&query=41.4499321,-122.331639


Predicthub

http://predict.cusf.co.uk/api/v1/?launch_latitude="+str(lat)+"&launch_longitude="+str(lon)+"&launch_datetime=2015-09-"+str(day)+"T"+str(hour)+"%3A00%3A00%2B01:00&ascent_rate=5&burst_altitude=30000&descent_rate=5
