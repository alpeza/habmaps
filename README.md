# habmaps

Utilidad para el seguimiento por gps

## RestAPI

`curl -s -X GET localhost:5000/data/FrameParser | jq`

`curl -s -X GET localhost:5000/data/distinct/hab | jq`
`curl -s -X GET localhost:5000/data/distinct/basestation | jq`

`curl -s -X GET localhost:5000/data/traces/basestation/<string:name>`
`curl -s -X GET localhost:5000/data/traces/hab/unhubid`


`curl -s -X GET localhost:5000/data/fetchlast`

`curl -s -X GET localhost:5000/data/fetchlast| jq '.[].lastseen'`


`curl -s -X GET localhost:5000/devices/status | jq`

`curl -s -X GET localhost:5000/devices/traces/10 | jq`

`curl -s -X GET localhost:5000/devices/tracespoly/10 | jq`

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
