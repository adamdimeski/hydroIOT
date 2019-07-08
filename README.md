# hydroIOT
An internet controlled Hydroponics Chamber

This project is a control system combined with a web interface to control a hydroponics box.

Technologies used:
 - NGROK for reverse tunneling to address http://hydro.comus.dynu.net
 - Python script using GPIOzero for controlling hardware components
 - NodeJS server usign express to serve a static web page to the client
 - JQuery to create web app on client's web browser
 - Redis is used a messaging system between express server and python script
 - Bootstrap to style the web app
 
 Inside hydro directory, hydro1.py is the python script controlling the hardware
 Inside the node_server directory:
  The public directory contains the static web files including JQuery.js for the interactive components
  Server.js is the express server.
  
These scripts are implements as systemd services on a raspberry pi zero with a wifi dongle.

Work on the project is currently active.
