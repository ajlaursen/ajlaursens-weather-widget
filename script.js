
var cityName = "";

var userEntry = JSON.parse(localStorage.getItem("userEntry")) || [];
// DONE gather user input and call api
// DONE store data to an array
// DONE save array to local storage
// DONE populate DOM with information from local storage on load
// DONE populate DOM with information after button clicked


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
// all api calls
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
      $("#forecast-current").empty();

      // grabs current day for current forecast
      var currentDateInfo = new Date(response.list[0].dt*1000);
      var currentDate = currentDateInfo.getDate();
      var currentMonth = currentDateInfo.getMonth()+1;
      var cityDisplay = response.city.name;
      $("#forecast-current").append("<h1 class=\"forecast\">" + cityDisplay + "</h1>")
      $("#forecast-current").append("<h2 class=\"forecast\">" + currentMonth + " / " + currentDate + "</h1>")
      
      // grabs date for daily forecast
      for (j = 0; j < response.list.length; j += 8){
        let day =  j/8;
        $("#day" + day).empty();
        forecastDate = new Date(response.list[j].dt*1000);
        month = forecastDate.getMonth() + 1;
        $("#day" + day).append("<h2 class=\"forecast\">" + month + " / " + forecastDate.getDate() + "</h2>");
        
      }
      
      var weatherAppUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly&units=imperial&appid=ca202c6ae2ceb6ff80e75b7ff67eaf7d";
      // using latitude and longitude from first api to input into second api to grab all weather info
      $.ajax({
        url: weatherAppUrl2,
        method: "GET"
      }).then(function(response){
        $(".card").removeClass("d-none");
        
        // populating current forecast
        currentTemp = Math.floor(response.current.temp);
        currentHumidity = response.current.humidity;
        feelsLike = response.current.feels_like;
        currentUv = response.current.uvi;
        currentWind = Math.floor(response.current.wind_speed);
        currentIcon = "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png";
        currentAlt = response.current.weather[0].description;
        $("#forecast-current").append("<img src=" + currentIcon +" class=\"forecast\" alt=\"" + currentAlt + "\"></img>")
        $("#forecast-current").append("<h5 class=\"forecast\">Current Temperature: " + currentTemp + String.fromCharCode(176) + "F</h5>");
        $("#forecast-current").append("<h5 class=\"forecast\">Current Wind Speed: " + currentWind + " MPH</h5>");
        if(currentUv > 5){
          $("#forecast-current").append("<h5 class=\"forecast text-danger\" >Current UV Index : " + currentUv + " MPH</h5>");
        }
        if(currentUv > 2){
          $("#forecast-current").append("<h5 class=\"forecast text-warning\" >Current UV Index : " + currentUv + " MPH</h5>");
        }
        else{
          $("#forecast-current").append("<h5 class=\"forecast text-success\" >Current UV Index : " + currentUv + " </h5>");
        }

        
        // grabs info and buids dom for five day
        var responseDaily = response.daily
        for (i = 0; i < responseDaily.length; i ++){
                      icon = "http://openweathermap.org/img/wn/" + responseDaily[i].weather[0].icon + "@2x.png";
                      temperatureHigh = Math.floor(responseDaily[i].temp.max);
                      temperatureLow = Math.floor(responseDaily[i].temp.min);
                      humidity = responseDaily[i].humidity;
                      windSpeed = Math.floor(responseDaily[i].wind_speed);
                      uvIndex = responseDaily[i].uvi;
                      altDescription = responseDaily[i].weather[0].description;
                      $("#day" + i).append("<img src=" + icon +" class=\"forecast\" alt=\"" +altDescription+ "\"></img>");
                      $("#day" + i).append("<div class=\"forecast\"> Temp: " + temperatureHigh + "/" + temperatureLow + String.fromCharCode(176) + "F</div>");
                      $("#day" + i).append("<div class=\"forecast\"> Humidity: " + humidity + "%</div>");
                      $("#day" + i).append("<div class=\"forecast\"> Windspeed: " + windSpeed + " MPH</div>");
                      $("#day" + i).append("<div class=\"forecast\"> UV Index: " + uvIndex + "</div>");
                      if(uvIndex > 5){
                        $("#day" + i).append("<h5 class=\"forecast text-danger\" >Current UV Index : " + uvIndex + "</h5>");
                      }
                      if(uvIndex > 2){
                        $("#day" + i).append("<h5 class=\"forecast text-warning\" >Current UV Index : " + uvIndex + "</h5>");
                      }
                      else{
                        $("#day" + i).append("<h5 class=\"forecast text-success\" >Current UV Index : " + uvIndex + "</h5>");
                      }
                    }                
      });
    });
  }
  
  
  apiCall(userEntry[0]);