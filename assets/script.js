
// This is my API key for OpenWeatherMap
var appid = 'bdc63249ca9c768d065db41d5ee05a7d';

var baseURL = 'https://api.openweathermap.org';

var geoURLSuffix = {baseURL}+'/geo/1.0/direct?q='+{cityEntered}+'&limit=5&appid='+{appid};

var cityEntered = 1;

var citySearchList = [];

var citySelectList = 1;

var day2 = 1;

var day3 = 1;

//set as global variable;
let cityName = $("#cityText").val();

//create function to save city entered to local storage

$(document).ready(function(){
    
     //get the city name from the element on button click
     $("#saveCityBtn").click(function(){
   //set city name inside click function too, why?
   let cityName = $("#cityText").val();

    //now set the item in local storage
    localStorage.setItem('city', JSON.stringify(cityName));

    //alert the value to make sure we got it right
    alert(localStorage.getItem('city'));
    console.log(cityName);

    });  
    
});
//why is this undefined out here?
console.log(cityName);
console.log(localStorage);