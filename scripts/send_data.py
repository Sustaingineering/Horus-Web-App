import pyrebase
import json
import math
import random
from time import sleep as s
from time import time as t

c = {
  "apiKey": "AIzaSyBI6chLsGI6XX67LGTXXH_gXLfngCS3aNs",
  "authDomain": "sustaingineering-horus.firebaseapp.com",
  "databaseURL": "https://sustaingineering-horus.firebaseio.com",
  "storageBucket": "sustaingineering-horus.appspot.com"
}

fb = pyrebase.initialize_app(c)
db = fb.database()
i = 0
sensors = ["123456", "69420", "1"]

while True:
    shape = {
        "power": random.randrange(200, 600),
        "surface-temperature": random.randrange(10, 30),
        "op-temp": random.randrange(10, 30),
        "current": math.sin(i),
        "water-breaker": random.randrange(0, 3),
        "time-stamp": int(t()),
        "voltage": math.cos(i)
    }
    i += 0.1
    for sensor in sensors:
        db.child(sensor).update({
            str(int(t())) : shape
        })
    s(2)