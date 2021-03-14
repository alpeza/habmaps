from xml.dom import minidom
from datetime import datetime, timedelta
import random
import csv
import sys
import os.path
#https://www.gpsvisualizer.com/draw/
#2018-07-03 21:41:26|13.6|41.408057,2.1814535|26.25|25.4|101391.0|GLOBO01|13.6|41.408057,2.1814535|ANTENA01
#timestamp|alt_globo|lat_globo,lon_globo|temp_int|temp_ext|presion|id_globo|alt_antena|lat_antena,lon_antena|id_antena
class trackComposer(object):

    def __init__(self, trackfile="",id="GLOBO1",baseStation="demoStation"):
        super(trackComposer, self).__init__()
        self.file = trackfile
        self.id=id
        self.baseStation=baseStation
        #Cargamos el fichero de tracks
        extension = os.path.splitext(self.file)[1]
        if extension == ".gpx":
            self._loadGPSTracks()
        elif extension == ".csv":
            self._loadCSVTracks()
        else:
            print("Extension " + extension + " No reconocida, emplee el csv de predicthab o .gpx")
            sys.exit(1)

        self.curtime=datetime.now()
        self.ramp=0

    def getTraces(self):
        return self._genTraces()

    def _loadCSVTracks(self):
        with open(self.file) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            line_count = 0
            self.gps_tracks=[]
            for row in csv_reader:
                it= str( str(row[1])  +","+ str(row[2]))
                self.gps_tracks.append(it)
                line_count += 1

    def _loadGPSTracks(self):
        self.xmldoc = minidom.parse(self.file)
        self.steps = self.xmldoc.getElementsByTagName('trkpt')
        self.gps_tracks=[]
        for s in self.steps:
            it= str(s.attributes['lat'].value)  +","+ str(s.attributes['lon'].value)
            self.gps_tracks.append(it)

    def _fetchTime(self):
        self.curtime=self.curtime + timedelta(minutes=3)
        return self.curtime.strftime("%Y-%m-%d %H:%M:%S")

    def _fetchRamp(self):
        self.ramp += 5
        return str(self.ramp)

    def _getRandValue(self,a,b):
        return str(random.uniform(a, b))


    def _genTraces(self):
        self.tracks=[]
        for t in self.gps_tracks:
            dataArr=[]
            dataArr.append(self._fetchTime()) #timestamp
            dataArr.append(self._fetchRamp()) #alt_globo
            dataArr.append(t) #lat lon
            dataArr.append(self._getRandValue(10.0,25.0)) #temp_int
            dataArr.append(self._getRandValue(5.0,20.0)) #temp_ext
            dataArr.append(self._getRandValue(5.0,20.0)) #presion
            dataArr.append(self.id) #id_globo
            dataArr.append("1") #alt_antena
            dataArr.append(t) #lat lon
            dataArr.append(self.baseStation) #id_antena
            self.tracks.append("|".join(dataArr))
        return self.tracks
'''
tc=trackComposer(trackfile='track1.gpx',id="GLOBO1")
print(tc.getTraces())
'''
