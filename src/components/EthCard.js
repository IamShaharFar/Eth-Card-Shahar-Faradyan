import React, { useEffect, useState } from "react";
import "../styles/EthCard.css";
import { prettyDOM } from "@testing-library/react";

const EthCard = ({ today_price, yesterday_price, updated_time }) => {
  const [change, setChange] = useState(null);
  const [eth, setEth] = useState(1.0);
  const [usd, setUsd] = useState(1.0);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    setUsd(today_price);
    let c = getChange();
    console.log(c);
    setChange(c ? c : { prec: 0, positive: true });
  }, [today_price, yesterday_price]);

  function getChange() {
    if (
      today_price == null ||
      yesterday_price == null ||
      yesterday_price === 0
    ) {
      return {
        prec: 0,
        positive: true,
      };
    }

    let change = today_price - yesterday_price;
    let percentageChange = (change / yesterday_price) * 100;
    let roundedPercentageChange = Number(percentageChange.toFixed(2));

    let description = roundedPercentageChange >= 0 ? true : false;

    console.log(typeof roundedPercentageChange, roundedPercentageChange);
    console.log(description);

    return {
      prec: roundedPercentageChange,
      positive: description,
    };
  }

  const handleEthChange = (e) => {
    const inputVal = e.target.value;
    setEth(inputVal); 
  
    const newEthValue = parseFloat(inputVal);
    if (!isNaN(newEthValue) && inputVal !== '0.') {
      setUsd(newEthValue * today_price);
    }
  };
  
  const handleUsdChange = (e) => {
    const inputVal = e.target.value;
    setUsd(inputVal);
  
    const newUsdValue = parseFloat(inputVal);
    if (!isNaN(newUsdValue) && inputVal !== '0.') {
      setEth(newUsdValue / today_price);
    }
  };
  
  
  
  

  return (
    <div className="bg-guardian d-flex justify-content-center align-items-center border-center rounded">
      <div className="card bg-white border-0">
        <div className="card-body rounded-4">
          <div className="d-flex flex-column align-items-start m-0">
            <div className="card-title mb-0 d-flex align-items-center">
              <img
                className="eth-img me-2"
                src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
              />
              <h2 className="mb-0 title">
                Ethereum
              </h2>
              <span className="eth-span ms-2">ETH</span>
            </div>
            <div className="price-change d-flex align-items-center">
              <h4 className="mt-0 mb-0 price">
                $
                {today_price
                  ? parseFloat(today_price).toFixed(2)
                  : "loading..."}
              </h4>
              {change ? (
                <h6
                  className={`ms-2 mb-0 ${
                    change.positive ? "text-success" : "text-danger"
                  }`}
                >
                  {change.prec}{" "}
                  {change.positive ? (
                    <i className="fa-solid fa-up-long"></i>
                  ) : (
                    <i class="fa-solid fa-down-long"></i>
                  )}
                </h6>
              ) : (
                <h6>0</h6>
              )}
            </div>

            <br />
          </div>
          <br />
          <div className="d-flex conversion">
            <div className="eth-conv d-flex flex-column align-items-start me-2">
              <h6 className="conversion-label">ETH</h6>
              <input
                className="form-control"
                value={eth}
                onChange={(e) => handleEthChange(e)}
              />
            </div>
            <div className="usd-conv d-flex flex-column align-items-start">
              <h6 className="conversion-label">USD</h6>
              <input
                className="form-control"
                value={usd}
                onChange={(e) => handleUsdChange(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthCard;
