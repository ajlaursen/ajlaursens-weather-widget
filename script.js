
var cityName = "";

var userEntry = JSON.parse(localStorage.getItem("userEntry")) || [];
// DONE gather user input and call api
// DONE store data to an array
// DONE save array to local storage
// DONE populate DOM with information from local storage on load
// populate DOM with information after button clicked


function populatePastSearches(){
  var loopLength = 10;
  if (userEntry.length < 10){
    loopLength = userEntry.length
  }  
  for (i = 0; i < loopLength; i++){
    $("#city-list").prepend("<li class=\"list-group-item\" data-name=\""+ userEntry[i] + "\">" + userEntry[i] + "</li>");
  }
}
populatePastSearches();


// need help with these grabbing proper data-id

$("li").click(function(){
  apiCall($(this)[0].getAttribute('data-name'));
  
})

// want to add functionality that doenst allow duplicates
$("#search-button").click(function(){  
  if (!userEntry.includes($("#city-input").val().trim())){
    userEntry.splice(0,0, $("#city-input").val().trim());
    console.log("runs if statement");
    localStorage.setItem("userEntry", JSON.stringify(userEntry));
    $("#city-list").prepend("<li class=\"list-group-item\" data-name=\""+ userEntry[0] + "\">" + userEntry[0] + "</li>");
  }  
    apiCall($("#city-input").val().trim())
});


var longitude = "";
var latitude = "";
var icon = "";
var temperatureHigh = "";
var temperatureLow = "";
var humidity = "";
var windSpeed = "";
var uvIndex = ""; 
var forecastDate = "";

function apiCall(userSelection){
  cityName = userSelection
  var weatherAppUrl1 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=ca202c6ae2ceb6ff80e75b7ff67eaf7d";
  
    $.ajax({
      url: weatherAppUrl1,
      method: "GET"
    }).then(function(response) {
      // grabbing latitude and longitude out of first api
      longitude = response.city.coord.lon.toString();
      latitude = response.city.coord.lat.toString();
      
      for (j = 0; j < response.list.length; j += 8){
        let day =  j/8;
        $("#day" + day).empty();
        forecastDate = new Date(response.list[j].dt*1000);
        month = forecastDate.getMonth() + 1;
        $("#day" + day).append("<h2 class=\"forecast\">" + month + " / " + forecastDate.getDate() + "</h2>");
        $("#forecast-current").append("<h1 class=\"forecast\">" + month + " / " + forecastDate.getDate() + "</h1>")
        
      }
      
      var weatherAppUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly&appid=ca202c6ae2ceb6ff80e75b7ff67eaf7d";
      // using latitude and longitude from first api to input into second api to grab all weather info
      $.ajax({
        url: weatherAppUrl2,
        method: "GET"
      }).then(function(response){
        $(".card").removeClass("d-none");
        responseDaily = response.daily
        for (i = 0; i < responseDaily.length; i ++){
                      icon = "http://openweathermap.org/img/wn/" + responseDaily[i].weather[0].icon + "@2x.png";
                      temperatureHigh = Math.floor((responseDaily[i].temp.max -273)*(9/5) +32);
                      temperatureLow = Math.floor((responseDaily[i].temp.min -273)*(9/5) +32);;
                      humidity = responseDaily[i].humidity;
                      windSpeed = responseDaily[i].wind_speed;
                      uvIndex = responseDaily[i].uvi;
                      $("#day" + i).append("<img src=" + icon +" class=\"forecast\"></img>");
                      $("#day" + i).append("<div class=\"forecast\"> Temp: " + temperatureHigh + "/" + temperatureLow + "</div>");
                      $("#day" + i).append("<div class=\"forecast\"> Humidity: " + humidity + "</div>");
                      $("#day" + i).append("<div class=\"forecast\"> Windspeed: " + windSpeed + "</div>");
                      $("#day" + i).append("<div class=\"forecast\"> UV Index: " + uvIndex + "</div>");
                    }                
      });
    });
  }
  
  
  apiCall(userEntry[0]);