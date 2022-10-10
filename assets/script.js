//should I be setting some of theise things as global variables first?


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
   .then((response)=>{
    // console.log(data);
    return response.json();
   })
   .then((completedata)=>{
    console.log(completedata[0].lat);
    console.log(completedata[0].lon);
        //some more steps, maybe create variables and pass on to next fetch?
        let lat = (completedata[0].lat);
        let lon = (completedata[0].lon);
        fetch(baseURL+"/data/3.0/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,alerts&appid="+appid+"&units=imperial")
          .then((response)=>{
            // console.log(wdata);
            return response.json();
          })
          .then((completewd)=>{
            console.log(completewd);
            // return completewd.json();
            //render weatherdata in here next

            //-----------------

            let temp = completewd.daily.temp;
            let wind = completewd.daily.wind;
            let humidity = completewd.daily.humidity;

            let cardData = "";

            completewd.map((values)=>{
              cardData+=` <div id="dayOne" class="card bg-secondary">
              <div class="card-body text-center">
                <p class="card-text">${values.date}</p><span>${values.icon}</span>
                <p class="card-text">Temp: ${values.temp} F</p>
                <p class="card-text">Wind: ${values.wind}mph</p>
                <p class="card-text">Humidity: ${values.humidity}%</p>
              </div>`
            } );
            document.getElementById("weatherCards").innerHTML = cardData















          })
          
        }
        )
      }
    })

// }).catch((err)=>{
//   console.log(err);
// })

  
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