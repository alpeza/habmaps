ramp = 0
import random
from datetime import datetime, timedelta
def _fetchTime():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def _fetchTimeM():
    res = datetime.now() - timedelta(hours=200)
    return res.strftime("%Y-%m-%d %H:%M:%S")

def _fetchRamp():
    global ramp
    ramp += 5
    return ramp

def _getRandValue(a,b):
    return str(random.uniform(a, b))
