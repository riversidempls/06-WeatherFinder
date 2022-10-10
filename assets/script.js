//Create a function to get the time ticker on the page


window.onload = function setDateTime() {
  var datetime = moment();
  var currentTime = datetime.format('LTS');
  document.getElementById('currentTime').innerHTML = currentTime;
  // Set an interval to refresh date/time every second
  //setInterval(setDateTime, 1000);
};

$(document).ready(function () {

  //get the city name from the element on button click
  $("#saveCityBtn").click(doSearch);
  $("#saveCityBtn").click(doStore);

  //Function here writes the city name to local storage for use in the saved search list
  function doStore() {
    let cityName = $("#cityText").val();
    console.log(cityName);
    //console.log("DoStoreWorks!!")

  };


  // Function below executes API search using city name and passes to geocoding API, 
  // then gets back lat lon coordinates and passes to weather data API
  function doSearch() {
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

            //-----------------

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
            const main = document.querySelector('card-deck');
            let divCardString = "<div>tomorrow</div";
            for (let i = 1; i < 6; i++) {
              divCardString += `<div id="dayOne" class="card bg-secondary">
              <div class="card-body text-center">
                <p class="card-text">10/9/2022</p><span></span>
                <p class="card-text">Temp: 90F</p>
                <p class="card-text">Wind: 24mph</p>
                <p class="card-text">Humidity: 34%</p>
              </div>`
            }

            main.innerHTML = divCardString;

            // completewd.map((completewd) => {
            //   cardData += ` <div id="dayOne" class="card bg-secondary">
            //   <div class="card-body text-center">
            //     <p class="card-text">${values.date}</p><span>${values.icon}</span>
            //     <p class="card-text">Temp: ${values.temp} F</p>
            //     <p class="card-text">Wind: ${values.wind}mph</p>
            //     <p class="card-text">Humidity: ${values.humidity}%</p>
            //   </div>`
            // });
            document.getElementById("weatherCards").innerHTML = cardData
          })

      }
      )
  }
})