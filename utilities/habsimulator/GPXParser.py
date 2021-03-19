import xmltodict, json
import trackComposer
class GPXParser(object):
    """docstring for GPXParser."""

    def __init__(self, file):
        super(GPXParser, self).__init__()
        self.file = file
        with open(self.file) as fil: # Use file to refer to the file object
            self.data = fil.read()
            self.js = xmltodict.parse(self.data)

    def getLatLonArr(self,data):
        arr = []
        for el in data['trkseg']['trkpt']:
            arr.append([el['@lat'],el['@lon']])
        return arr

    def fetchSimulations(self):
        simuls = {}
        for el in self.js['gpx']['trk']:
            name = el['name']
            if '@' in name:
                splt = name.split('@')
                balloon = splt[0]
                bs = splt[1]
                if not balloon in simuls:
                    simuls[balloon] = {
                        "data": [],
                        "len": 0
                    }
                elems  = self.getLatLonArr(el)
                simuls[balloon]['data'].append({
                    "type": "basestation",
                    "name": bs,
                    "samples": elems
                    }
                )
            else:
                if not name in simuls:
                    simuls[name] = {
                        "data": [],
                        "len": 0
                    }
                elif not 'hab' in simuls[name]:
                    simuls[name]['hab'] = []
                    elems  = self.getLatLonArr(el)
                    simuls[name]['hab']={
                        "type": "hab",
                        "name": name,
                        "samples": elems
                    }
        #print(json.dumps(simuls))
        return simuls

    def getComposedTraces(self):
        simulations = self.fetchSimulations()
        obj={}
        for sim in simulations:
            obj[sim] = []
            # 1.- Obtenemoos los datos del hab
            habdata = simulations[sim]['hab']['samples']
            total = len(habdata)
            # 2.- Para cada bbasestation componemos
            for bs in simulations[sim]['data']:
                bsdata = bs['samples']
                thab = len(bsdata)
                minn = min([total,thab])
                obj[sim].append({
                    "name": bs['name'],
                    "hab": habdata[:minn],
                    "bs": bsdata[:minn]
                })
        #print(json.dumps(obj))
        return obj

    def getTracks(self):
        asr = trackComposer.genTracks(self.getComposedTraces())
        #print(asr)
        return asr




    def plot(self):
        print(json.dumps(self.js))
