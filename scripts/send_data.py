import firebase_admin
from firebase_admin import db
from firebase_admin import credentials
import json
import math
import random
from time import sleep as s
from time import time as t

cred = credentials.Certificate("serviceAccount.json")
fb = firebase_admin.initialize_app(cred, options={
    "databaseURL": "https://sustaingineering-horus.firebaseio.com"
})

i = 0
sensors = ["123456", "69420", "1"]

while True:
    time = t()
    shape = {
        "power": random.randrange(200, 600),
        "surface-temperature": random.randrange(10, 30),
        "op-temp": random.randrange(10, 30),
        "current": math.sin(i),
        "water-breaker": random.randrange(0, 3),
        "time-stamp": int(time),
        "voltage": math.cos(i)
    }
    i += 0.1
    for sensor in sensors:
        # Update or set is the same here, since we're accessing a child that's unique already
        db.reference(path=sensor).child(str(int(time))).set(shape)
    s(2)
