import sys
sys.path.append('../')
import database
dbh = database.db.dbHandler()
import logging,time
from datetime import datetime

def getAllFromTable(tname):
    dbh = database.db.dbHandler()
    table = dbh.db.table(tname)
    return table.all()

def truncateAllFromTable(tname):
    dbh = database.db.dbHandler()
    table = dbh.db.table(tname)
    return table.truncate()

def removeTrace(baseballon,tname):
    """Elimina una determinada traza"""
    dbh = database.db.dbHandler()
    table = dbh.db.table('FrameParser')
    q = dbh.getQuery()
    return table.remove((q.type == 'frame') & (q[baseballon].id == tname))

def getFieldData(field):
    dbh = database.db.dbHandler()
    q = dbh.getQuery()
    results = dbh.db.table('FrameParser').search(q.type == 'frame')
    result = [r[field]['id'] for r in results]
    return result

def getDistinctFieldData(item):
    """
    Retorna los distintos elementos habs y estaciones base que
    que se han registrado
    """
    dbh = database.db.dbHandler()
    return [x for x in set(getFieldData(item))]

def getTracesForBaseOrBallon(baseballon,name):
    dbh = database.db.dbHandler()
    table = dbh.db.table('FrameParser')
    q = dbh.getQuery()
    return table.search((q.type == 'frame') & (q[baseballon].id == name))

def getStatusForBase(baseStation):
    dbh = database.db.dbHandler()
    table = dbh.db.table('FrameParser')
    q = dbh.getQuery()
    return table.search((q.type == 'health') & (q.id == baseStation))

def fetchLastTraces():
    """ Retorna la última traza """
    dbh = database.db.dbHandler()
    obj = {
        "basestations":[],
        "habs":[],
        "statusframes":[]
    }
    #1.- Obtenemos los distintos disp moviles
    habsid = getDistinctFieldData('hab')
    basestationsid = getDistinctFieldData('basestation')
    #2.- Recuperamos las trazas de globos
    for hab in habsid:
        lst = getTracesForBaseOrBallon('hab',hab)[-1]
        obj['habs'].append({
            "id": lst['hab']['id'],
            "trace": lst['hab']['payload'],
            "pos": lst['hab']['pos'],
            "ftime": lst['ftime']
        })
    #3.- Recuperamos las trazas de estaciones base
    for bs in basestationsid:
        lstb = getTracesForBaseOrBallon('basestation',bs)[-1]
        obj['basestations'].append({
            "id": lstb['basestation']['id'],
            "pos": lstb['basestation']['pos'],
            "ftime": lstb['ftime']
        })
        try:
            lststs = getStatusForBase(bs)[-1]
            obj['statusframes'].append(lststs)
        except Exception as e:
            logging.error(e)
            logging.error("No hay tramas de status")
    return obj



def _calcDateDiferece(now,then,strformat=True):
    if strformat:
        fmt = '%Y-%m-%d %H:%M:%S'
        d1 = datetime.strptime(then, fmt)
        d2 = datetime.strptime(now, fmt)
    else:
        d1 = then
        d2 = now

    d1_ts = time.mktime(d1.timetuple())
    d2_ts = time.mktime(d2.timetuple())

    return int(d2_ts-d1_ts) / 60

def datetime_from_utc_to_local(utc_datetime):
    utc_datetime = datetime.strptime(utc_datetime,"%Y-%m-%d %H:%M:%S")
    now_timestamp = time.time()
    offset = datetime.fromtimestamp(now_timestamp) - datetime.utcfromtimestamp(now_timestamp)
    dtf = utc_datetime + offset
    return dtf.strftime("%Y-%m-%d %H:%M:%S")

def getDeviceStatus():
    """ Retorna el status """
    retarr = {
        "habs":[],
        "basestations":[]
    }
    naw = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    #1.- Obtenemos las últimas trazas
    lt = fetchLastTraces()
    #2.- Calculamos el estado para los habs
    for ha in lt['habs']:
        state = False
        diff = _calcDateDiferece(naw,ha['ftime'])
        if diff <= 4:
            state = True
        retarr['habs'].append({
            "id": ha['id'],
            "lastseen": datetime_from_utc_to_local(ha['ftime']),
            "minutesago": round(diff),
            "secondsago": round(diff * 60),
            "online": state
            }
        )
    #3.- Calculamos el estado para las estaciones base
    for bs in lt['basestations']:
        state = False
        #3.1 - Obtenemos el último mensaje de status para
        #la estación base
        fmt = '%Y-%m-%d %H:%M:%S'
        statse = getStatusForBase(bs['id'])
        if len(statse) == 0:
            statse = datetime(2000, 4, 13)
        else:
            statse = datetime.strptime(statse[-1]['ftime'], fmt)
        latest_seen = max([datetime.strptime(bs['ftime'], fmt), statse])
        diff = _calcDateDiferece(datetime.utcnow(),latest_seen,strformat=False)
        if diff <= 4:
            state = True
        retarr['basestations'].append({
            "id": bs['id'],
            "lastseen": datetime_from_utc_to_local(latest_seen.strftime(fmt)),
            "minutesago": round(diff),
            "secondsago": round(diff * 60),
            "online": state
            }
        )

    return retarr


def fetchLastNTraces(ntraces):
    """ Retorna la última traza """
    dbh = database.db.dbHandler()
    obj = {
        "basestations":{},
        "habs":{}
    }
    #1.- Obtenemos los distintos disp moviles
    habsid = getDistinctFieldData('hab')
    basestationsid = getDistinctFieldData('basestation')
    #2.- Recuperamos las trazas de globos
    for hab in habsid:
        lst = getTracesForBaseOrBallon('hab',hab)[-1 * ntraces:]
        print("--> TotalFetched: " + str(len(lst)))
        obj['habs'][hab] = []
        for it in lst:
            obj['habs'][hab].append(
                {
                    "trace": it['hab']['payload'],
                    "pos": it['hab']['pos'],
                    "ftime": it['ftime']
                }
            )
    #3.- Recuperamos las trazas de estaciones base
    for bs in basestationsid:
        lstb = getTracesForBaseOrBallon('basestation',bs)[-1 * ntraces:]
        obj['basestations'][bs] = []
        for it in lstb:
            obj['basestations'][bs].append(
                {
                    "pos": it['basestation']['pos'],
                    "ftime": it['ftime']
                }
            )
    return obj

def fetchLastNTracesPolyline(ntraces):
    """ Retorna la polilyne en el formato adecuado """
    obj = {
        "basestations":[],
        "habs":[]
    }
    traz = fetchLastNTraces(ntraces)
    # 1.- Sacamos la info de los habs
    for hab in traz['habs']:
        polyarr=[]
        for val in traz['habs'][hab]:
            polyarr.append([ val['pos']['lat'],val['pos']['lon'] ])
        obj['habs'].append({
            "id": hab,
            "data": polyarr
        })
    # 2.- Sacamos la info de las estaciones bases
    for bs in traz['basestations']:
        polyarr=[]
        for val in traz['basestations'][bs]:
            polyarr.append([ val['pos']['lat'],val['pos']['lon'] ])
        obj['basestations'].append({
            "id": bs,
            "data": polyarr
        })
    return obj
