//Create a function to get the time ticker on the page


window.onload = function setDateTime() {
  var datetime = moment();
  var currentTime = datetime.format('LT');
  document.getElementById('currentTime').innerHTML = currentTime;
  // Set an interval to refresh date/time every second
  //setInterval(setDateTime, 1000);
};

$(document).ready(function () {
  //hide the unfilled forecast divs until content is loaded
  $("#forecasts").hide();

  //get the city name from the element on button click
  $("#saveCityBtn").click(doSearch);
  $("#saveCityBtn").click(doStore);

  //Function here writes the city name to local storage for use in the saved search list
  function doStore() {
    let searchedCities = [];
    let cityName = $("#cityText").val();
    searchedCities.push(cityName);
    console.log(searchedCities);
    //console.log("DoStoreWorks!!")
    //window.localStorage.push("city", cityName);

  };


  // Function below executes API search using city name and passes to geocoding API, 
  // then gets back lat lon coordinates and passes to weather data API
  function doSearch() {
    $("#forecasts").show(); // show the forecast divs only after button click
    const appid = 'bdc63249ca9c768d065db41d5ee05a7d';
    const baseURL = 'https://api.openweathermap.org';
    let cityName = $("#cityText").val();
    fetch(baseURL + "/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + appid)
      .then((response) => {
        // console.log(data);
        return response.json();
      })
      .then((completedata) => {
        console.log(completedata[0].lat);
        console.log(completedata[0].lon);
        //some more steps, maybe create variables and pass on to next fetch?
        let lat = (completedata[0].lat);
        let lon = (completedata[0].lon);
        fetch(baseURL + "/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + appid + "&units=imperial")
          .then((response) => {
            // console.log(wdata);
            return response.json();
          })
          .then((completewd) => {
            console.log(completewd);
            // return completewd.json();
            //render weatherdata in here next

            //-----CURRENT CONDITIONS BELOW

            let curCity = completewd.cityName;
            let curTemp = "Temp: " + completewd.current.temp + " °F";
            let curWind = "Wind: " + completewd.current.wind_speed + " Mph";
            let curHumidity = "Humidity: " + completewd.current.humidity + "%";
            var curDate = moment.unix(completewd.current.dt).format("MM/DD/YYYY");
            var curDay = moment.unix(completewd.current.dt).format('dddd');
            var curIcon = "http://openweathermap.org/img/w/" + completewd.current.weather[0].icon + ".png";

            document.getElementById('today').innerHTML = "Current Conditions - " + curDay;
            document.getElementById('citydate').innerHTML = cityName + " - " + curDate;
            document.getElementById("curicon").src = "http://openweathermap.org/img/w/" + completewd.current.weather[0].icon + ".png";
            document.getElementById('curtemp').innerHTML = curTemp;
            document.getElementById('curwind').innerHTML = curWind;
            document.getElementById('curhumidity').innerHTML = curHumidity;


            console.log(curDay);
            console.log(curDate);
            console.log("cityName variable is " + cityName);
            console.log("curTemp variable is " + curTemp);
            console.log("curWind variable is " + curWind);
            console.log("curHumidity variable is " + curHumidity);

            //let's populate the five forecast cards next
            var main = document.getElementById('card-deck');
            console.log(main);


            let divCardString = "";
            for (let i = 1; i < 6; i++) {
              var forecastIcon = completewd.daily[i].weather[0].icon;
              var forecastDayDay = moment.unix(completewd.daily[i].dt).format("dddd");
              var forecastDayDate = moment.unix(completewd.daily[i].dt).format("MM/DD/YYYY");
              var forecastDayHigh = completewd.daily[i].temp.max;
              var forecastDayWind = completewd.daily[i].wind_speed;
              var forecastDayHumidity = completewd.daily[i].humidity;

              console.log(forecastIcon);

              divCardString += '<div style="display:flex">\
              <div class="card">\
                <h4 id="currentTime">'+ forecastDayDay + '</h4>\
                <img id="curicon" alt="icon" src="http://openweathermap.org/img/w/'+ forecastIcon + '.png" width="75" height="75">\
                <p id="curtemp">High Temp: '+ forecastDayHigh + ' °F</p>\
                <p id="curwind">Wind: '+ forecastDayWind + 'Mph</p>\
              <p id="curhumidity">Humidity: '+ forecastDayHumidity + '%</p>\
              </div >'
            }
            main.innerHTML = divCardString;
          })

      }
      )
  }
})