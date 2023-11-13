import logo from "./logo.svg";
import "./App.css";
import EthCard from "./components/EthCard";
import { useEffect, useState } from "react";

function App() {
  const [firstPrice, setFirstPrice] = useState(null);
  const [lastPrice, setLastPrice] = useState(null);
  const [updated, setUpdated] = useState(null)

  useEffect(() => {
    getPrices();
  }, []);

  function getPrices() {
    fetch(
      "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1"
    )
      .then((response) => response.json())
      .then((data) => {
        const prices = data.prices;
        const firstPrice = prices[0];
        const lastPrice = prices[prices.length - 1];
        setFirstPrice(firstPrice);
        setLastPrice(lastPrice);
        setUpdated(Date.now())
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  return (
    <div className="App">
      <EthCard
        today_price={firstPrice ? firstPrice[1] : null}
        yesterday_price={lastPrice ? lastPrice[1] : null}
        updated_time={updated? updated :null}
      />
    </div>
  );
}

export default App;
