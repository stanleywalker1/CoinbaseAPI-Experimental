

const output = document.querySelector('#output');


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ********** Accessing the coinbase price data **********

accessData = async () => {
    let sym = document.getElementById('myText').value;
    console.log(sym);
    let url = "https://api.coinbase.com/v2/prices/"+sym+"-USD/buy";
    let response = await fetch(url);

    if (response.ok){
      let json = await response.json();
      coinbaseData(json);
    } else {
      console.log('Error: ' + response.status);
      document.querySelector('p').textContent = "Sorry that coin data is not avalible";
    }
  }

  coinbaseData = (response) => {
    let price = response.data.amount;
    if (price >= 100) {
    document.querySelector('p').textContent = Math.round(price);
    } else if (price < 100) {
      document.querySelector('p').textContent = price;
    }
    // apply CSS blur filter to an object
      // let priceVar = 'blur(' + price + 'px)';
      // let priceObj = document.querySelector('.obj');
      // priceObj.style.filter = priceVar;
    
      var svgn = "http://www.w3.org/2000/svg";
      var svg = document.getElementById('svg');
      var circle = document.createElementNS(svgn, "circle");
      circle.setAttributeNS(null, "cx", getRandomInt(0, output.clientWidth));
      circle.setAttributeNS(null, "cy", getRandomInt(0, output.clientHeight));
      circle.setAttributeNS(null, "r",  20);
      circle.setAttributeNS(null, "fill", "pink");
      svg.appendChild(circle);
  }



  // ********** Accessing the weather data, incase we want a sun/moon in the scene or someting  **********

  accessWeatherData = async () => {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=New+York&units=imperial&appid=0a5f4c023e25d8e825de810cbf664116'
    let response = await fetch(url);

    if (response.ok){
      let json = await response.json();
      weatherData(json);
    } else {
      console.log('Error: ' + response.status);
    }
  }

  weatherData = (response) => {
    let sunrise = response.sys.sunrise;
    let currentTime = Math.floor(Date.now() / 1000);
    console.log(sunrise);

    let sunset = response.sys.sunset;
    console.log(sunset);
  }



  document.querySelector('button').addEventListener('click', accessData);
  //document.querySelector('#weather').addEventListener('click', accessWeatherData);
