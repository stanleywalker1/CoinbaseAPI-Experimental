const output = document.getElementById("output");

//  ********** Helper Functions **********
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  var palettes = [
    ["100", "20", "180"],
    ["200", "80", "80"],
    ["180", "100", "90"],
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
    document.querySelector("p").textContent =
      "Sorry that coin data is not avalible";
  }
};

coinbaseData = (response) => {
  let price = response.data.amount;
  if (price >= 100) {
    document.querySelector("p").textContent = Math.round(price);
  } else if (price < 100) {
    document.querySelector("p").textContent = price;
  }
  // apply CSS blur filter to an object
  // let priceVar = 'blur(' + price + 'px)';
  // let priceObj = document.querySelector('.obj');
  // priceObj.style.filter = priceVar;
  let x = getRandomInt(0, output.clientWidth);
  let y = getRandomInt(0, output.clientHeight);
  let x1 = 0;
  let y1 = 50000;
  let x2 = 3;
  let y2 = 150;

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

  // var svgNS = "http://www.w3.org/2000/svg";
  // var newText = document.createElementNS(svgNS,"text");
  // newText.setAttributeNS(null,"x",x);
  // newText.setAttributeNS(null,"y",y);
  // newText.setAttributeNS(null,"font-size","100");

  // var textNode = document.createTextNode(val);
  // newText.appendChild(textNode);
  // document.getElementById("myText").appendChild(newText);

  svg.appendChild(circle);
};

document.querySelector("button").addEventListener("click", accessData);

// make the button click when enter key is pressed
document.getElementById("myText").addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.querySelector("button").click();
  }
}
);

