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


### Autenticación y gestión de Tokens

`curl -X POST -d '{ "user":"pepe","password":"root" }' localhost:5000/login`

`curl -s -X POST -d '{ "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJleHAiOjE2MTYzMzIxMDh9.1foUn3RivBuypW2FScmb3PBKEX9KA2BvVeA_K0805mo"}' localhost:5000/authen/validate | jq`


### Gestion de procesos

`curl -X GET -s localhost:5000/proc/list | jq`

`curl -X PUT -s localhost:5000/proc/action/stop/mqttlistener | jq`


### Gestión de la configuración

`curl -X GET localhost:5000/config`

`curl -X PUT -d '{"advertisedHostName": "my-amazon.ws.com", "rodolfo": "dos"}' localhost:5000/config`

`curl -X GET localhost:5000/config/props/advertisedHostName`