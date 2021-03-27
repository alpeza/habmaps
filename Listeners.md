# Default Listeners

## MQTT

## Elastic Listener

Se encarga de idexar los datos de entrada en ElasticSearch

https://i-o-optimized-deployment-f2337f.es.us-west1.gcp.cloud.es.io:9243

curl -s -u elastic:tZ0NErqsYHd9Jwljy433ZIVR https://i-o-optimized-deployment-f2337f.es.us-west1.gcp.cloud.es.io:9243/my_index/_doc -XPOST -H 'Content-Type: application/json' -d '{"title": "One", "tags": ["ruby"]}' | jq

curl -s -u elastic:elastic http://localhost:9200/habmaps/habmaps -XPOST -H 'Content-Type: application/json' -d '{"title": "One", "tags": ["ruby"]}' | jq


curl -s -u elastic:elastic http://localhost:9200/asdf/asdf -XPOST -H 'Content-Type: application/json' -d '{"type": "frame", "ftime": "2021-03-27 17:03:48", "hab": {"id": "superhab", "pos": {"lat": 39.681826, "lon": -2.3071289}, "payload": [{"name": "high", "value": 20}, {"name": "TempInterior", "value": "12.383365071425565"}, {"name": "TempExterior", "value": "9.828670221042387"}, {"name": "Presion", "value": "18.186031730536662"}]}, "basestation": {"id": "unaestacion", "pos": {"lat": 38.7883454, "lon": -1.4831543}}}' | jq