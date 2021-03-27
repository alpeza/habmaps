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

# Protocolo

Distinguimos los siguientes mensajes válidos para envíar al MQTT.


### HeartBeat
Se trata de un mensaje que indica que la estación base está
viva.
* __type__: health
* __ftime__: Timestamp en el que se registró la muestra
* __id__: Identificador de la estación base

```json
{
  "type": "health",
  "ftime": "2021-03-26 15:09:10",
  "id": "miestacionbase"
}
```


### Trama

Se trata del mensaje que ha de enviar la estación base hacia el MQTT.

* __type__: frame
* __ftime__: Timestamp en el que se registró la muestra
* __hab__: Objeto de definición del hab
    * __id__: Identificador del globo
    * __pos__: Objeto de posición del globo con la latitud y longitud
* __payload__ lista de valores de sensores. Si no hay sensores dejar a blanco 
    `payload : []`
* __basestation__: Datos de la estación base que registra la trama.
    * __id__: Identificador de la estación base.
    * __pos__: Latitud y longitud de la estación base.
    Dejar a 0 si no se va a emplear esta modalidad:
      
      ```json 
        "basestation": {
          "id": "estaesotraesta",
          "pos": {
             "lat": 0,
             "lon": 0
          }
      }
      ```
      

```json
{
  "type": "frame",
  "ftime": "2021-03-26 15:09:10",
  "hab": {
    "id": "elIdDeMiHab",
    "pos": {
      "lat": 38.5911138,
      "lon": -1.439209
    },
    "payload": [
      {
        "name": "high",
        "value": 80
      },
      {
        "name": "TempInterior",
        "value": "17.477750802022154"
      },
      {
        "name": "TempExterior",
        "value": "7.662387109586051"
      },
      {
        "name": "Presion",
        "value": "11.992894902660938"
      }
    ]
  },
  "basestation": {
    "id": "estaesotraesta",
    "pos": {
      "lat": 38.4105583,
      "lon": -1.2744141
    }
  }
}
```


Podemos encontrar ejemplos en [utilities](utilities). Este es
un ejemplo de [cliente](utilities/maptrackerex.py)