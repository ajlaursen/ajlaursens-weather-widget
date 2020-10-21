
var cityName = "";
// var weatherAppUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=ca202c6ae2ceb6ff80e75b7ff67eaf7d";
var userEntry = JSON.parse(localStorage.getItem("userEntry")) || [];
// gather user input and call api
// store data to an array
// save array to local storage
// populate DOM with information from local storage on load
// populate DOM with information after button clicked


$("#search-button").click(function(){
    userEntry.splice(0,0, $("#city-input").val().trim());
    localStorage.setItem("userEntry", JSON.stringify(userEntry));
    apiCall(userEntry[0])
});

function apiCall(userSelection){
    cityName = userSelection
    var weatherAppUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=ca202c6ae2ceb6ff80e75b7ff67eaf7d";
    $.ajax({
        url: weatherAppUrl,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });
}

function populateForecast (){
    
}