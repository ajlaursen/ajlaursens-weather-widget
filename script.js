
var cityName = "";
// var weatherAppUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=ca202c6ae2ceb6ff80e75b7ff67eaf7d";
// AIzaSyAtGuIjd1HJxCQ3liqTraeGsTMiMLWKkFc
var userEntry = JSON.parse(localStorage.getItem("userEntry")) || [];
// DONE gather user input and call api
// DONE store data to an array
// DONE save array to local storage
// populate DOM with information from local storage on load
// populate DOM with information after button clicked


$("#search-button").click(function(){
    userEntry.splice(0,0, $("#city-input").val().trim());
    localStorage.setItem("userEntry", JSON.stringify(userEntry));
    apiCall(userEntry[0])
});
var longitude = "";
var latitude = "";
var icon = "";
var temperatureHigh = "";
var temperatureLow = "";
var humidity = "";
var windSpeed = "";
var uvIndex = ""; 

function apiCall(userSelection){
  cityName = userSelection
  var weatherAppUrl1 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ca202c6ae2ceb6ff80e75b7ff67eaf7d";
    $.ajax({
      url: weatherAppUrl1,
      method: "GET"
    }).then(function(response) {
      longitude = response.city.coord.lon.toString();
      latitude = response.city.coord.lat.toString();
      console.log(longitude);
      var responseList = response.list
      for (i = 2; i < responseList.length; i += 8){
        console.log(responseList[i]);
        icon = responseList[i].weather[0].icon;
        temperatureHigh = responseList[i].main.temp_max;
        temperatureLow = responseList[i].main.temp_min;
        humidity = responseList[i].main.humidity;
        windSpeed = responseList[i].wind.speed;
      }
    });
    var weatherAppUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly&appid=ca202c6ae2ceb6ff80e75b7ff67eaf7d";
    $.ajax({
      url: weatherAppUrl2,
      method: "GET"
    }).then(function(response){
      console.log(response);
    });
  }
  
  function populateForecast (){
    
  }
