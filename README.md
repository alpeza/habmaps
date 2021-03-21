# HABMaps

![](habmaps/uiserver/src/assets/img/brand/argon-react-white.png)

Utilidad para el seguimiento por gps

## RestAPI

### Gestion del buffer


`curl -s -X GET localhost:5000/data/FrameParser | jq`


`curl -s -X GET localhost:5000/data/distinct/hab | jq`


`curl -s -X GET localhost:5000/data/distinct/basestation | jq`


`curl -s -X GET localhost:5000/data/traces/basestation/<string:name>`


`curl -s -X GET localhost:5000/data/traces/hab/unhubid`


`curl -s -X DELETE localhost:5000/data/traces/basestation/unaestacion`


`curl -s -X GET localhost:5000/data/fetchlast`

`curl -s -X GET localhost:5000/data/fetchlast| jq '.[].lastseen'`


`curl -s -X GET localhost:5000/devices/status | jq`


`curl -s -X GET localhost:5000/devices/traces/10 | jq`


`curl -s -X GET localhost:5000/devices/tracespoly/10 | jq`


`curl -X POST -d '{ "user":"pepe","password":"root" }' localhost:5000/login`


`curl -s -X POST -d '{ "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJleHAiOjE2MTYzMzIxMDh9.1foUn3RivBuypW2FScmb3PBKEX9KA2BvVeA_K0805mo"}' localhost:5000/authen/validate | jq`

### Gestion de procesos



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
