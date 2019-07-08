var express = require('express');
var app = express();
var redis = require('redis');
var client = redis.createClient();

var temp = "";
var humidity = "";
var lights = "";
var fan = "";
var fantimer = "";
var lightstimer = "";
var fantimeron = "";
var fantimerduration = "";
var lightstimeron = "";
var lightstimeroff = "";

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});


app.use(express.static('public'));

app.get('/setlights', function(req,res) {
	if(req.query.lights != null)
	{
		client.set('lights', req.query.lights, redis.print);
	}
	res.send('done');	
});

app.get('/setfan', function(req,res) {
        if(req.query.fan != null)
        {
                client.set('fan', req.query.fan, redis.print);
        }
        res.send('done');      
});

app.get('/setfantimer', function(req,res) {
        if(req.query.fantimer != null && req.query.fantimeron != null && req.query.fantimerduration != null)
        {
                client.set('fantimer', req.query.fantimer, redis.print);
		client.set('fantimeron', req.query.fantimeron, redis.print);
		client.set('fantimerduration', req.query.fantimerduration, redis.print);
        }
        res.send('done');      
});

app.get('/setlightstimer', function(req,res) {
        if(req.query.lightstimer != null && req.query.lightstimeron != null && req.query.lightstimeroff != null)
        {
                client.set('lightstimer', req.query.lightstimer, redis.print);
		client.set('lightstimeron', req.query.lightstimeron, redis.print);
		client.set('lightstimeroff', req.query.lightstimeroff, redis.print);
        }
        res.send('done');      
});





app.get('/getstatus', function(req,res) {
        getvalues();
        res.json({"lights": parseInt(lights),"fan": parseInt(fan),"temp": parseInt(temp),"humidity": parseInt(humidity), "fantimer": parseInt(fantimer), "lightstimer": parseInt(lightstimer) });       
});


var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening on port 80", host, port)
})



function getvalues(){
client.get("lights", function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    lights = result;
});

client.get("temp", function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    temp = result;
});

client.get("fan", function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    fan = result;
});

client.get("humidity", function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    humidity = result;
});
client.get("fantimer", function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    fantimer = result;
});
client.get("fantimeron", function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    fantimeron = result;
});
client.get("fantimerduration", function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    fantimerduration = result;
});
client.get("lightstimer", function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    lightstimer = result;
});
client.get("lightstimeron", function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    lightstimeron = result;
});
client.get("lighstimeroff", function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    lightstimeroff = result;
});


}
