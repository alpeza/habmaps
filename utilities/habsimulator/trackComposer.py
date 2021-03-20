import time
import simsignals as ss


def genTracks(simulations):
    obj = {}
    for sim in simulations:
        obj[sim] = []
        habname = sim
        for s in simulations[sim]:
            objtmp = []
            bsname = s['name']
            for i in range(len(s['hab'])):
                objtmp.append(gettrack(habname,bsname,s['hab'][i],s['bs'][i]))
            obj[sim].append(objtmp)
    #print(obj)
    return obj




def gettrack(habid,bsid,habll,bsll):
    track = {
      "type": "frame",
      "ftime": ss._fetchTime(),
      "hab":{
        "id": habid,
        "pos":{
          "lat": float(habll[0]),
          "lon": float(habll[1])
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
        "id": bsid,
        "pos":{
          "lat": float(bsll[0]),
          "lon": float(bsll[1])
        }
      }
    }
    return track
