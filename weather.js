$(function(){
  var C = false;
  var apiData;
  
  backgroundImg = [

    'http://wtop.com/wp-content/uploads/2014/07/355929-1865x1254.jpg',
    'https://cdn.pixabay.com/photo/2015/08/03/22/25/rain-874041_960_720.jpg',
    'http://cdn.abclocal.go.com/content/wtvd/images/cms/automation/images/511280_1280x720.jpg',
    'http://www.whcma.com/wp-content/uploads/2017/03/falling_snow_effect.jpg',
    'https://static.pexels.com/photos/5230/road-fog-foggy-mist.jpg',
    'http://wallpaperstock.net/clear-sky-field--hay-bale_wallpapers_41557_1920x1080.jpg',
    'https://cdn.pixabay.com/photo/2016/01/19/17/12/roadway-1149579_960_720.jpg',
  ]
  
  function displayTemp(F,C){
        if(C) return Math.round((F-32)*(5/9)) + '&deg; C';
    return Math.round(F) + '&deg; F';
  }
  
  function render (data, C){
  	var currentWeather = data.weather[0].description;
  	var currentTemp = displayTemp(data.main.temp,C);
  	var icon = data.weather[0].icon;

  	$('#currentTemp').html(currentTemp);
  	$('#currentWeather').html(currentWeather);

  	var apiIcon = 'http://openweather.org/img/w/10d/' + icon + '.png';
  	$('#currentTemp').prepend('<img src =' + apiIcon + '>');
  }
  
  
  $.getJSON('https://freegeoip.net/json/').done(function(location){
    //console.log(location);
    $('#country').html(location.country_name);
    $('#city').html(location.city);
    $('#latitude').html(location.latitude);
    $('#longitude').html(location.longitude);
    
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' +location.latitude+ '&lon=' +location.longitude+'&units=imperial&appid=93503078803b2256419177ea0c2dafec', function(data){
    apiData=data;
    //console.log(apiData); //Success
    render(apiData,C);
    //
    $('#toggle').click(function(){
    	C = !C
    	render(data,C)
    });

    var id = data.weather[0].id,
    	bgIndex,
    	backgroundId = [299,499,599,699,799,800];

    	backgroundId.push(id); 
    	bgIndex = backgroundId.sort().indexOf(id);
    	//console.log(backgroundId);
    	//
    	$('body').css('background-image', 'url(' + backgroundImg[bgIndex] + ')');


    
  })  
  })
  
})
