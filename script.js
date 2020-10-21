
var cityName = "";

var userEntry = JSON.parse(localStorage.getItem("userEntry")) || [];
// DONE gather user input and call api
// DONE store data to an array
// DONE save array to local storage
// DONE populate DOM with information from local storage on load
// populate DOM with information after button clicked


function populatePastSearches(){
  userEntry
  for (i = 0; i < 10; i++){
    $("#city-list").prepend("<li class=\"list-group-item\" data-name=\""+ userEntry[i] + "\">" + userEntry[i] + "</li>");
  }
}

populatePastSearches();

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
  $("#city-list").prepend("<li class=\"list-group-item\" data-name=\""+ cityName + "\">" + cityName + "</li>");
    $.ajax({
      url: weatherAppUrl1,
      method: "GET"
    }).then(function(response) {
      // grabbing latitude and longitude out of first api
      longitude = response.city.coord.lon.toString();
      latitude = response.city.coord.lat.toString();
      
      var weatherAppUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly&appid=ca202c6ae2ceb6ff80e75b7ff67eaf7d";
      // using latitude and longitude from first api to input into second api to grab all weather info
      $.ajax({
        url: weatherAppUrl2,
        method: "GET"
      }).then(function(response){
        console.log(response);
        responseDaily = response.daily
                    for (i = 0; i < responseDaily.length; i ++){
                      console.log(responseDaily[i]);
                      icon = responseDaily[i].weather[0].icon;
                      temperatureHigh = responseDaily[i].temp.max;
                      temperatureLow = responseDaily[i].temp.min;
                      humidity = responseDaily[i].humidity;
                      windSpeed = responseDaily[i].wind_speed;
                      uvIndex = responseDaily[i].uvi;

                    }
                
      });
    });
  }
  