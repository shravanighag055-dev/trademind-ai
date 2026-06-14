// ===============================
// STOCK SEARCH + CHART
// ===============================

function searchStock() {

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

    displayWatchlist();

}

function loadStock(stock) {

    document.getElementById("stockInput").value = stock;

    searchStock();

}
