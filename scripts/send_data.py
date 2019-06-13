import pyrebase
import json
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

while True:
    shape = {
        "power": random.randrange(200, 600),
        "surface-temperature": random.randrange(10, 30),
        "op-temp": random.randrange(10, 30),
        "current": random.randrange(0, 5),
        "water-breaker": random.randrange(0, 3),
        "time-stamp": int(t()),
        "voltage": random.randrange(0, 10)
    }
    db.child("69420").push(shape)
    s(2)

