const output = document.getElementById("output");

//  ********** Helper Functions **********
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  var palettes = [   
    ["117", "123", "200"],
    ["129", "135", "220"],
    ["142", "148", "242"],
    ["159", "160", "255"],
    ["173", "167", "255"],
    ["187", "173", "255"],
    ["203", "178", "254"],
    ["218", "182", "252"],
    ["221", "189", "252"],
    ["224", "195", "252"],
  ];
  
  var randomPalette = palettes[Math.floor(Math.random() * palettes.length)];
  var colorString =
    "rgb(" +
    randomPalette[0] +
    "," +
    randomPalette[1] +
    "," +
    randomPalette[2] +
    ")";



  return colorString;
}

// ********** Accessing the coinbase price data **********

accessData = async () => {
  let sym = document.getElementById("myText").value;
  console.log(sym);
  let url = "https://api.coinbase.com/v2/prices/" + sym + "-USD/buy";
  let response = await fetch(url);

  if (response.ok) {
    let json = await response.json();
    coinbaseData(json);
  } else {
    console.log("Error: " + response.status);
    document.getElementById("price_value").textContent = "Sorry that coin data is not avalible";
  }
};

coinbaseData = (response) => {
  let sym = document.getElementById("myText").value;
  let price = response.data.amount;
  if (price >= 100) {
    document.getElementById("price_value").textContent =  sym + ": $" + Math.round(price) ;
  } else if (price < 100) {
    document.getElementById("price_value").textContent = sym + ": $" + price;
  }
  // apply CSS blur filter to an object
  // let priceVar = 'blur(' + price + 'px)';
  // let priceObj = document.querySelector('.obj');
  // priceObj.style.filter = priceVar;
  let x = getRandomInt(0, output.clientWidth);
  let y = getRandomInt(0, output.clientHeight);
  let x1 = 0;
  let y1 = 50000;
  let x2 = 40;
  let y2 = 90;

  var svgn = "http://www.w3.org/2000/svg";
  var svg = document.getElementById("svg");
  var circle = document.createElementNS(svgn, "circle");
  circle.setAttributeNS(null, "cx", x);
  circle.setAttributeNS(null, "cy", y);
  const map = (price, x1, y1, x2, y2) =>
    ((price - x1) * (y2 - x2)) / (y1 - x1) + x2;
  console.log(map);
  circle.setAttributeNS(null, "r", map(price, x1, y1, x2, y2));
  circle.setAttributeNS(null, "fill", randomColor());

  // put the value of "sym" as text in the center of each circle created
  // make text proportional to the radius of the circle

  var text = document.createElementNS(svgn, "text");
  text.setAttributeNS(null, "x", x);
  text.setAttributeNS(null, "y", y);
  text.setAttributeNS(null, "fill", "white");
  text.setAttributeNS(null, "font-family", "Arial");
  text.setAttributeNS(null, "text-anchor", "middle");
  text.textContent = document.getElementById("myText").value;
  // set font size proportional to the radius of the circle
  var fontSize = map(price, x1, y1, x2, y2) / 2;
  text.setAttributeNS(null, "font-size", fontSize);

  //make text uppercase
  text.textContent = text.textContent.toUpperCase();

  // add a black border to the circle
  circle.setAttributeNS(null, "stroke", "black");
  circle.setAttributeNS(null, "stroke-width", "1");

  //add the circle to the svg
  svg.appendChild(circle);

  //add the text to the svg
  svg.appendChild(text);

  //define fadeout animation

};
  
// ********** Event Listeners **********
document.getElementById("fetch_price").addEventListener("click", accessData);

// make the button click when enter key is pressed
document.getElementById("myText").addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("fetch_price").click();
  }
}
);

