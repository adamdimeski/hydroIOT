$(document).ready(function(){
	var temp;
	var humidity;
	var fan;
	var lights;
	var fantimer;
	var lightstimer;
	var fantimeron;
	var fantimerduration;
	var lightstimeron;
	var lightstimeroff;
	
	$("#togglefanon").click(function(){
	fetch('http://hydro.comus.dynu.net:80/setfan?fan=1', {
                        method: 'GET',
                        mode: 'cors'
                }).catch(function(err) {
                        alert(err);
                });
	});
	 $("#togglefanoff").click(function(){
        fetch('http://hydro.comus.dynu.net:80/setfan?fan=0', {
                        method: 'GET',
                        mode: 'cors'
                }).catch(function(err) {
                        alert(err);
                });
        });
	
	$("#togglelightson").click(function(){
        fetch('http://hydro.comus.dynu.net:80/setlights?lights=1', {
                        method: 'GET',
                        mode: 'cors'
                }).catch(function(err) {
                        alert(err);
                });
        });

        $("#togglelightsoff").click(function(){
        fetch('http://hydro.comus.dynu.net:80/setlights?lights=0', {
                        method: 'GET',
                        mode: 'cors'
                }).catch(function(err) {
                        alert(err);
                });
        });

	$("#togglelightstimeron").click(function(){
	var lightstimeron = $('#txtlightstimeron').val();
	var lightstimeroff = $('#txtlightstimeroff').val();
	$('#txtlightstimeron').val("");
	$('#txtlightstimeroff').val("");
        fetch('http://hydro.comus.dynu.net:80/setlightstimer?lightstimer=1&lightstimeron=' + lightstimeron +'&lightstimeroff=' + lightstimeroff, {
                        method: 'GET',
                        mode: 'cors'
                }).catch(function(err) {
                        alert(err);
                });
        });

	$("#togglelightstimeroff").click(function(){
        fetch('http://hydro.comus.dynu.net:80/setlightstimer?lightstimer=0&lightstimeron=1&lightstimeroff=2', {
                        method: 'GET',
                        mode: 'cors'
                }).catch(function(err) {
                        alert(err);
                });
        });

	$("#togglefantimeron").click(function(){
	var fantimeron = $('#txtfantimeron').val();
        var fantimerduration = $('#txtfantimerduration').val();
        $('#txtfantimeron').val("");
        $('#txtfantimerduration').val("");
        fetch('http://hydro.comus.dynu.net:80/setfantimer?fantimer=1&fantimeron=' + fantimeron + '&fantimerduration=' + fantimerduration, {
                        method: 'GET',
                        mode: 'cors'
                }).catch(function(err) {
                        alert(err);
                });
        });

	$("#togglefantimeroff").click(function(){
        fetch('http://hydro.comus.dynu.net:80/setfantimer?fantimer=0&fantimeron=2&fantimerduration=30', {
                        method: 'GET',
                        mode: 'cors'
                }).catch(function(err) {
                        alert(err);
                });
        });


	function refresh_values()
	{
		fetch('http://hydro.comus.dynu.net:80/getstatus', {
                        method: 'GET',
                        mode: 'cors'
                }).then(function(response) {
                        return response.json()
                }).then(function(data){
                        console.log(JSON.stringify(data))
			temp = data.temp;
			fan = data.fan;
			lights = data.lights;
			humidity = data.humidity;
			fantimer = data.fantimer
			lightstimer = data.lightstimer
                }).catch(function(err) {
                        // Error :(
        	});

		$('#temptag').text("Temperature: " + temp + "°C");
		$('#humiditytag').text("Humidity: " + humidity + "%");
		

		if(parseInt(fan) != 0)
		{
			$('#fantag').text("Fan: On");
			$('#fantag').css('color', 'green');
		}
		else
		{
			$('#fantag').text("Fan: Off");
			$('#fantag').css('color', 'red');
		}
		
		if(parseInt(lights) != 0)
                {
                        $('#lightstag').text("Lights: On");
			$('#lightstag').css('color', 'green');
                }
                else
                {
                        $('#lightstag').text("Lights: Off");
			$('#lightstag').css('color', 'red');
                }

		if(parseInt(lightstimer) != 0)
                {
                        $('#lightstimertag').text("Lights Timer: On");
                        $('#lightstimertag').css('color', 'green');
                }
                else
                {
                        $('#lightstimertag').text("Lights Timer: Off");
                        $('#lightstimertag').css('color', 'red');
                }

		if(parseInt(fantimer) != 0)
                {
                        $('#fantimertag').text("Fan Timer: On");
                        $('#fantimertag').css('color', 'green');
                }
                else
                {
                        $('#fantimertag').text("Fan Timer: Off");
                        $('#fantimertag').css('color', 'red');
                }



		setTimeout(refresh_values,500);
	}
	refresh_values();


});
