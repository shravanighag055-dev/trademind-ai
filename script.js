// ===============================
// STOCK SEARCH + CHART
// ===============================

function searchStock() {

let company =
companies[stock.toUpperCase()];

if(company){

document.getElementById("companyProfile").innerHTML =

`
<h3>${company.name}</h3>

<p><strong>Sector:</strong> ${company.sector}</p>

<p><strong>CEO:</strong> ${company.ceo}</p>

<p><strong>Market Cap:</strong> ${company.marketCap}</p>

<p>${company.description}</p>
`;

}
else{

document.getElementById("companyProfile").innerHTML =

`
<h3>${stock.toUpperCase()}</h3>

<p>Company data not available.</p>
`;

}

    let stock =
    document.getElementById("stockInput").value.trim();

    if(stock === "") {
        alert("Please enter a stock symbol");
        return;
    }

    document.getElementById("result").innerHTML =
    `Showing chart for: <b>${stock.toUpperCase()}</b>`;

    document.getElementById("tradingview_chart").innerHTML = "";

    new TradingView.widget({

        "width": "100%",

        "height": 500,

        "symbol": "NASDAQ:" + stock.toUpperCase(),

        "interval": "D",

        "timezone": "Asia/Kolkata",

        "theme": "dark",

        "style": "1",

        "locale": "en",

        "toolbar_bg": "#111827",

        "enable_publishing": false,

        "container_id": "tradingview_chart"

    });

}

// ===============================
// PORTFOLIO SIMULATOR
// ===============================

function calculatePortfolio() {

    let buyPrice =
    parseFloat(document.getElementById("buyPrice").value);

    let currentPrice =
    parseFloat(document.getElementById("currentPrice").value);

    let quantity =
    parseInt(document.getElementById("quantity").value);

    if (
        isNaN(buyPrice) ||
        isNaN(currentPrice) ||
        isNaN(quantity)
    ) {

        alert("Please fill all fields correctly");
        return;

    }

    let investment =
    buyPrice * quantity;

    let currentValue =
    currentPrice * quantity;

    document.getElementById(
"portfolioValue"
).innerText =
"₹" + currentValue.toFixed(2);

    let profit =
    currentValue - investment;

    let returnPercent =
    ((profit / investment) * 100).toFixed(2);

    document.getElementById("portfolioResult").innerHTML =

    `
    <h3>Portfolio Results</h3>

    <p><strong>Investment:</strong> ₹${investment.toFixed(2)}</p>

    <p><strong>Current Value:</strong> ₹${currentValue.toFixed(2)}</p>

    <p><strong>Profit/Loss:</strong> ₹${profit.toFixed(2)}</p>

    <p><strong>Return:</strong> ${returnPercent}%</p>
    `;

}

// ===============================
// WATCHLIST
// ===============================

let watchlist =
JSON.parse(localStorage.getItem("watchlist")) || [];

displayWatchlist();

function addWatchlist() {

    let stock =
    document.getElementById("watchStock").value.trim();

    if(stock === "") return;

    watchlist.push(stock.toUpperCase());

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    displayWatchlist();

    document.getElementById("watchStock").value = "";

}

function displayWatchlist() {

    let list =
    document.getElementById("watchlist");

    list.innerHTML = "";

    watchlist.forEach((stock, index) => {

        list.innerHTML +=

        `
        <li>

            ${stock}

            <button onclick="loadStock('${stock}')">
                View
            </button>

            <button onclick="removeStock(${index})">
                ❌
            </button>

        </li>
        `;

    });

}

function removeStock(index) {

    watchlist.splice(index, 1);

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

 function displayWatchlist() {

    let list =
    document.getElementById("watchlist");

    list.innerHTML = "";

    watchlist.forEach((stock, index) => {

        list.innerHTML +=
        `
        <li>
            ${stock}

            <button onclick="loadStock('${stock}')">
                View
            </button>

            <button onclick="removeStock(${index})">
                ❌
            </button>
        </li>
        `;

    });

    // Update dashboard count
    document.getElementById(
        "watchlistCount"
    ).innerText = watchlist.length;

}
}

function loadStock(stock) {

    document.getElementById("stockInput").value = stock;

    searchStock();

}

const companies = {

    AAPL: {
        name: "Apple Inc.",
        sector: "Technology",
        ceo: "Tim Cook",
        marketCap: "$3T",
        description: "Apple is one of the world's largest technology companies, known for products like the iPhone, Mac, iPad, Apple Watch, 
            and services such as iCloud, Apple Music, and the App Store. The company generates revenue from both hardware sales and a 
    rapidly growing services ecosystem, making it a favorite among long-term investors.
Key Highlights
Consumer technology leader
Strong brand loyalty and ecosystem
Growing services business
Consistent profitability and cash flow."
    },

    TSLA: {
        name: "Tesla Inc.",
        sector: "Automotive",
        ceo: "Elon Musk",
        marketCap: "$1T",
        description: "Tesla is an electric vehicle and clean energy company known for vehicles such as the Model 3, Model Y, Model S, and Cybertruck. Beyond automobiles, Tesla operates in energy storage, solar solutions, and autonomous driving technologies. The stock is known for high growth potential and higher volatility compared to many large-cap stocks.

Key Highlights

Global EV market leader
Focus on autonomous driving and AI
Energy storage and solar business
High-growth but volatile stock."

    },

    MSFT: {
        name: "Microsoft",
        sector: "Technology",
        ceo: "Satya Nadella",
        marketCap: "$3T",
        description: "Microsoft is a global software and cloud computing company. Its major products include Windows, Microsoft 365, Azure Cloud, LinkedIn, GitHub, and Xbox. The company's strong position in cloud computing and artificial intelligence has made it one of the most valuable companies in the world.

Key Highlights

Leader in cloud computing (Azure)
Strong AI and enterprise software presence
Diverse revenue streams
Consistent earnings growth."
    }

};
