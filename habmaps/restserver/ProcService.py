import subprocess,json
import re,os
from random import choice
from string import ascii_uppercase

def manageTask(id,action):
    out = subprocess.Popen(['pm2', action, str(id)],stderr=subprocess.STDOUT,stdout=subprocess.PIPE)
    stdout,stderr = out.communicate()
    stdout = stdout.decode('utf-8')
    print(stdout)
    m = re.search(r'\[ERROR\] Process (\d+) not found', stdout)
    if m:
        print("[ERROR] Task " + str(id) + " not found")
        return {"task": id, "status":"Task Not Found", "code": 404}
    else:
        print("[INFO] Task " + str(id) + " deleted")
        return {"task": id, "status":"Task " + action, "code": 200}

def getTasks():
    """ Obtiene todos los procesos que estan corriendo """
    # 1.- Ejecutamos el comando de consola pm2 jlist
    out = subprocess.Popen(['pm2', 'jlist'],
       stdout=subprocess.PIPE,
       stderr=subprocess.STDOUT)
    stdout,stderr = out.communicate()
    dictout = json.loads(stdout)
    #2.- Componemos el retorno
    items=[]
    for item in dictout:
        try:
            args = item['pm2_env']['args']
        except Exception as e:
            args = []
        items.append({
            "pid" : item['pid'],
            "name" : item['name'],
            "definition": args,
            "monit": item['monit'],
            "created_at": item['pm2_env']['created_at'],
            "status":item['pm2_env']['status'],
                "id": item['pm_id'],
                "errorlog": item['pm2_env']["pm_err_log_path"],
                "outlog": item['pm2_env']["pm_out_log_path"],
                "restarts": item['pm2_env']['restart_time'],
                "uptime": item['pm2_env']['pm_uptime']
            })

    return items
