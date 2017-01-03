# -*- coding: utf-8 -*-
#!/usr/bin/python
'''
    dbManager
    ~~~~~~~~~
    A MongoDB Client for use in the IOT Projects. Initially being used for storing Temperature/Humidity Values of
    various Raspberry Pies around a household, for empirical data.
'''
__version__ = 0.1

from pymongo import MongoClient
from datetime import datetime

class dbManager(object):

    def __init__(self, host, port):
        self.connect(host,port)

    def connect(self, host, port):
        try:
            self.client = MongoClient(host=host, port=port)
            print '[*] Connected To Database'
        except Exception, e:
            print '[!] Connection Error: ',e

    def disconnect(self):
        try:
            self.client.close()
            print '[*] Disconnected From Database'
        except Exception, e:
            print '[!] Error While trying to Close Connection: ', e

    def insertTemp(self,sensorID,temp,humidity):
        db = self.client.Sensors
        try:
            # Adding new Temperature Value to DB.
            db.Temperature.insert_one({
                "sensorId": sensorID,
                "Temperature F": temp,
                "humidity": humidity,
                "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            })
            print "[+] Inserted Data into Sensors Database"
        except Exception, e:
            print "[!] Error While Trying to Insert Into Sensors Database: ",e

    def printDatabase(self):
        #TODO: Create Pretty Print for Fetching Data from DB.
        db = self.client.Sensors
        try:
            data = db.Temperature.find()
            print '[=] Fetching Data from Database: Sensors'
            for d in data:
                print d
        except Exception, e:
            print "[!] Error While Fetching Data From Database: ",e


if __name__ == "__main__":
    print '[~] Initializing DB Manager'
    db = dbManager('localhost',27017)
    db.insertTemp("pi3","75","33%")
    db.printDatabase()
    db.disconnect()
