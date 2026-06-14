// =========================
// COMPANY DATA
// =========================

const companies = {

    AAPL: {
        name: "Apple Inc.",
        sector: "Technology",
        ceo: "Tim Cook",
        marketCap: "$3 Trillion"
    },

    TSLA: {
        name: "Tesla Inc.",
        sector: "Automotive",
        ceo: "Elon Musk",
        marketCap: "$1 Trillion"
    },

    MSFT: {
        name: "Microsoft",
        sector: "Technology",
        ceo: "Satya Nadella",
        marketCap: "$3 Trillion"
    }

};

// =========================
// LOAD DEFAULT CHART
// =========================

window.onload = function () {

    new TradingView.widget({
        width: "100%",
        height: 500,
        symbol: "NASDAQ:AAPL",
        interval: "D",
        timezone: "Asia/Kolkata",
        theme: "dark",
        style: "1",
        locale: "en",
        container_id: "tradingview_chart"
    });

    displayWatchlist();

};

// =========================
// SEARCH STOCK
// =========================

function searchStock() {

    let stock =
        document.getElementById("stockInput")
        .value
        .toUpperCase();

    if (stock === "") {
        alert("Enter Stock Symbol");
        return;
    }

    document.getElementById("result")
        .innerHTML =
        "Showing: " + stock;

    document.getElementById(
        "tradingview_chart"
    ).innerHTML = "";

    new TradingView.widget({
        width: "100%",
        height: 500,
        symbol: "NASDAQ:" + stock,
        interval: "D",
        timezone: "Asia/Kolkata",
        theme: "dark",
        style: "1",
        locale: "en",
        container_id: "tradingview_chart"
    });

    let company =
        companies[stock];

    if (company) {

        document.getElementById(
            "companyProfile"
        ).innerHTML =

            `
            <h3>${company.name}</h3>

            <p><b>Sector:</b> ${company.sector}</p>

            <p><b>CEO:</b> ${company.ceo}</p>

            <p><b>Market Cap:</b> ${company.marketCap}</p>
            `;

    } else {

        document.getElementById(
            "companyProfile"
        ).innerHTML =

            `
            <p>
            Company information not available.
            </p>
            `;

    }

}

// =========================
// PORTFOLIO CALCULATOR
// =========================

function calculatePortfolio() {

    let buyPrice =
        parseFloat(
            document.getElementById(
                "buyPrice"
            ).value
        );

    let currentPrice =
        parseFloat(
            document.getElementById(
                "currentPrice"
            ).value
        );

    let quantity =
        parseInt(
            document.getElementById(
                "quantity"
            ).value
        );

    if (
        isNaN(buyPrice) ||
        isNaN(currentPrice) ||
        isNaN(quantity)
    ) {

        alert("Fill all fields");
        return;

    }

    let investment =
        buyPrice * quantity;

    let currentValue =
        currentPrice * quantity;

    let profit =
        currentValue - investment;

    document.getElementById(
        "portfolioResult"
    ).innerHTML =

        `
        <p>
        Investment: ₹${investment.toFixed(2)}
        </p>

        <p>
        Current Value: ₹${currentValue.toFixed(2)}
        </p>

        <p>
        Profit/Loss: ₹${profit.toFixed(2)}
        </p>
        `;

    document.getElementById(
        "portfolioValue"
    ).innerText =
        "₹" +
        currentValue.toFixed(2);

}

// =========================
// WATCHLIST
// =========================

let watchlist =
    JSON.parse(
        localStorage.getItem(
            "watchlist"
        )
    ) || [];

function addWatchlist() {

    let stock =
        document.getElementById(
            "watchStock"
        ).value
        .toUpperCase();

    if (stock === "")
        return;

    watchlist.push(stock);

    localStorage.setItem(
        "watchlist",
        JSON.stringify(
            watchlist
        )
    );

    document.getElementById(
        "watchStock"
    ).value = "";

    displayWatchlist();

}

function displayWatchlist() {

    let list =
        document.getElementById(
            "watchlist"
        );

    list.innerHTML = "";

    watchlist.forEach(
        (stock, index) => {

            list.innerHTML +=

                `
                <li>

                    ${stock}

                    <button
                    onclick="loadStock('${stock}')">
                    View
                    </button>

                    <button
                    onclick="removeStock(${index})">
                    ❌
                    </button>

                </li>
                `;

        });

    document.getElementById(
        "watchlistCount"
    ).innerText =
        watchlist.length;

}

function removeStock(index) {

    watchlist.splice(index, 1);

    localStorage.setItem(
        "watchlist",
        JSON.stringify(
            watchlist
        )
    );

    displayWatchlist();

}

function loadStock(stock) {

    document.getElementById(
        "stockInput"
    ).value = stock;

    searchStock();

}
