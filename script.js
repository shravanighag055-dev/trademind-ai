function searchStock(){

let stock =
document.getElementById("stockInput").value;

document.getElementById("result").innerHTML =
"You searched for: " + stock;

}
function calculatePortfolio(){

let buyPrice =
parseFloat(document.getElementById("buyPrice").value);

let currentPrice =
parseFloat(document.getElementById("currentPrice").value);

let quantity =
parseInt(document.getElementById("quantity").value);

let investment =
buyPrice * quantity;

let currentValue =
currentPrice * quantity;

let profit =
currentValue - investment;

let returnPercent =
((profit / investment) * 100).toFixed(2);

document.getElementById("portfolioResult").innerHTML =
`
<h3>Results</h3>
<p>Investment: ₹${investment}</p>
<p>Current Value: ₹${currentValue}</p>
<p>Profit/Loss: ₹${profit}</p>
<p>Return: ${returnPercent}%</p>
`;

}
