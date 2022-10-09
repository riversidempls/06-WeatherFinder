
// This is my API key for OpenWeatherMap
var appid = 'bdc63249ca9c768d065db41d5ee05a7d'

var baseURL = 'https://api.openweathermap.org'

var geoURLSuffix = {baseURL}+'/geo/1.0/direct?q='+{cityEntered}+'&limit=5&appid='+{appid}

var cityEntered

var citySearchList

var citySelectList

var day2

var day3

function addCity() {
    // Parse any JSON previously stored in allEntries
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if(existingEntries == null) existingEntries = [];
    var cityText = document.getElementById("cityText").value;
    var entry = {
        "text": cityText
    };
    localStorage.setItem("entry", JSON.stringify(entry));
    // Save allEntries back to local storage
    existingEntries.push(entry);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
};

$(document).ready(function ()
$("#saveCityBtn").click(function(){
    addCity;
});

console.log(localStorage);