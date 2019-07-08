import time
from time import sleep
from gpiozero import LED
from gpiozero import Button
import Adafruit_DHT
import redis

sensor = Adafruit_DHT.DHT11
gpio = 17
humidity = 0
temp = 0
while (1 == 1):
        humidity, temp = Adafruit_DHT.read_retry(sensor, gpio)
        print(str(humidity))
        print(str(temp))
        time.sleep(0.1)
