//var geoURLSuffix = {baseURL}+'/geo/1.0/direct?q='+{cityEntered}+'&limit=1&appid='+{appid};

// var cityEntered = 1;

// var citySearchList = [];

// var citySelectList = 1;

// var day2 = 1;

// var day3 = 1;

//create function to save city entered to local storage

$(document).ready(function()
{ 
 //get the city name from the element on button click
  $("#saveCityBtn").click(doSearch)

 
function doSearch()
{
  // This is my API key for OpenWeatherMap
  const appid = 'bdc63249ca9c768d065db41d5ee05a7d';
  const baseURL = 'https://api.openweathermap.org';
  let cityName = $("#cityText").val();
  fetch(baseURL+"/geo/1.0/direct?q="+cityName+"&limit=1&appid="+appid)
   .then((response) => response.json());
   .then(data => console.log(data));
   return data.json();
  };
  .then((completedata)=>{
  console.log(completedata[2].lat);

}).catch((err)=>{
  console.log(err);
})

  
  // const cityData = fetch(response);
  // //const cityLon = getCityData(lon);
  // console.log(cityData);
  // var parsedCityData = JSON.parse(cityData);
  // console.log(parsedCityData.lat);
  // console.log(parsedCityData.lon);


  //  .then console.log(cityData);
  //console.log(cityData);
  // let parsedJSON = JSON.parse(data);
  // console.log(cityLat);
  // console.log(cityLon);

  // let lat = (parsedJSON);
  // let lon = (parsedJSON);

  
  //   //now set the item in local storage
  //   //localStorage.setItem('city', JSON.stringify(response.));
  //   //run second API call on the first result
  // let returnCity = JSON.parse()
  
// console.log(lat);
// console.log(lon);
  };
})

///TEST
//    fetch('https://pinballmap.com/api/v1/machines.json'
// {
// //   method: 'GET', //GET is the default.
//   region: 119 // include, *same-origin, omit
// //   //redirect: 'follow', // manual, *follow, error
//  }

// )
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

//NEXT STEP TO PASS LAT LON

  //   //now set the item in local storage
  //   //localStorage.setItem('city', JSON.stringify(cityName));

  //   //alert the value to make sure we got it right
  //   alert(localStorage.getItem('city'));
  //   console.log(cityName);
