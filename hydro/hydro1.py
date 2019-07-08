#!/usr/bin/python
# -*- coding: utf-8 -*-
import time
import sys, os
from time import sleep
from gpiozero import LED
from gpiozero import Button
import Adafruit_DHT
import redis
import os
import datetime as dt
r = redis.StrictRedis(host='localhost', port=6379, db=0)

sensor = Adafruit_DHT.DHT11

gpio = 17
fan_c = LED(23)
lights_c = LED(24)
fan_b = Button(22)
lights_b = Button(27)
stopButton = Button(4)
temp = 0
lights = 0
fan = 0
humidity = 0
lights_on = 0
lights_off = 0
fantimer = 0
reset_sensor_time = float(0)
lightstimer = 0
lightstimeron = 0
lightstimeroff = 0
fantimerduration = 0
fantimerflag = 0
lightstimerflag = 0
lightstimerend = 0
fantimerend = 0
fanhour = 0

def get_duration(lightstimeron, lightstimeroff):
    if(lightstimeron < lightstimeroff):
        return abs(lightstimeroff - lightstimeron)
    else:
        return abs((24-lightstimeroff)-(24-lightstimeron))

def refresh_values():
    global fan
    global lights
    global temp
    global humidity
    global reset_sensor_time
    global fantimer
    global lightstimer
    global lightstimeron
    global lightstimeroff
    global fantimerduration
    try:
        if(float(reset_sensor_time) < time.time()):
            reset_sensor_time = time.time() + float((2*60))
            humidity, temp = Adafruit_DHT.read_retry(sensor, gpio)
        r.set('temp', temp)
        r.set('humidity', humidity)
        fan = int(r.get('fan'))
        lights = int(r.get('lights'))
        fantimer = int(r.get('fantimer'))
        fantimerduration = int(r.get('fantimerduration'))
        lightstimer = int(r.get('lightstimer'))
        lightstimeron = int(r.get('lightstimeron'))
        lightstimeroff = int(r.get('lightstimeroff'))
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)

try:
    fan_c.on()
    lights_c.on()
    os.system('redis-cli config set stop-writes-on-bgsave-error no')
    r.set('fan', 0)
    r.set('lights', 0)
    r.set('fantimer', 0)
    r.set('fantimerduration', 0)
    r.set('lightstimer', 0)
    r.set('lightstimeron', 0)
    r.set('lightstimeroff', 0)
except:
    print('error fixing cahcing on redis')
print('past start')
while 1 == 1:
    refresh_values()
    if fan_b.is_pressed:
        if fan == 0:
            fan = 1
        else:
            fan = 0
        r.set('fan', fan)
        time.sleep(0.3)

    if lights_b.is_pressed:
        if lights == 0:
            lights = 1
        else:
            lights = 0
        r.set('lights', lights)
        time.sleep(0.3)

    if stopButton.is_pressed:
        time.sleep(2)
        if(stopButton.is_pressed):
            os.system('shutdown now -h')
    if fan == 0:
        fan_c.on()
    else:
        fan_c.off()

    if lights == 0:
        lights_c.on()
    else:
        lights_c.off()

    if(lightstimer == 1):
        if(dt.datetime.today().hour == lightstimeron and lightstimerflag == 0):
            lightstimerflag = 1
            lightstimerend = (time.time() + 36000) + (get_duration(lightstimeron,lightstimeroff)*3600)
            lights = 1
            r.set('lights', lights)
            lights_c.off()
            print('inside lights 1')
        if((time.time()+36000) >= lightstimerend and lightstimerflag == 1):
            print('inside lights 2')
            lightstimerflag = 0
            lights = 0
            r.set('lights', lights)
            lights_c.on()
    if(fantimer == 1):
        if(fanhour != dt.datetime.today().hour and fantimerflag == 0):
            print('isnide fan 1')
            fanhour = dt.datetime.today().hour
            fantimerflag = 1
            fantimerend = (time.time() + 36000) + (60*fantimerduration)
            print('fantimerduration: ' + str(fantimerduration) + " fanhour: " + str(fanhour) + " time: " +  str(time.time() + 36000) + " fantimerend: " + str(fantimerend))
            fan_c.off()
            fan = 1
            r.set('fan', fan)
        if(fantimerend <= (time.time()+36000) and fantimerflag == 1):
            print("inside fan 2")
            fan_c.on()
            fan = 0
            r.set('fan', fan)
            fantimerflag = 0
