'''
    Script To Take Tempture of DHT11 Sensor and place it in Mongo Database.
'''
__version__ = 0.1
#!/usr/bin/python
import sys
import Adafruit_DHT
from dbManager import dbManager

db = dbManager('localhost',27017)
def toFaren(cel):
    return (cel * 9/5 + 32)

humidity, temperature = Adafruit_DHT.read_retry(11, 4)
db.insertTemp("Bedroom1",toFaren(temperature),humidity)
db.printDatabase()
db.disconnect()


