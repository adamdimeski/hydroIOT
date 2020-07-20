# hydroIOT
An internet controlled Hydroponics Chamber

This project is a control system combined with a web interface to control a hydroponics box.

Technologies used:
 - NGROK for reverse tunneling to address <a href="https://htmlpreview.github.io/?https://github.com/adamdimeski/hydroIOT/blob/master/node_sever/public/index.html">hydro.comus.dynu.net</a>
 - Python script using GPIOzero for controlling hardware components
 - NodeJS server using express to serve a static web page to the client
 - JQuery to create web app on client's web browser
 - Redis is used as a messaging system between the express server and the python script
 - Bootstrap to style the web app
 
 Inside hydro directory, hydro1.py is the python script controlling the hardware
 Inside the node_server directory:
  The public directory contains the static web files including JQuery.js for the interactive components
  Server.js is the express server.
  
These scripts are implements as systemd services on a raspberry pi zero with a wifi dongle.

Work on the project is currently active.

Current Features:
  - Remote Control of Fan/Lights
  - Temperature and Humidity Readout
 
Features Coming Soon:
  - Automatic Control of Fan with respect to temperature and grow guide
  - Lights Timer
  - Remote control of fogger devices
  - Camera View

Hardware Components:
  - Raspberry Pi Zero with a USB wifi adaptor
  - 3v3 Relays
  - DHT11 Temperature and Humididty Sensor
  - 12V Computer Fan
  - Full Spectrum LED Panels
  - 12V Power Supply
