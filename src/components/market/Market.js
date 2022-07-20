import React, { useState, useEffect } from "react";
import SideMenu from "../sideMenu/sideMenu";
import "./Market.css";
import axios from "axios";
import BuyingModal from "../buyingModal/buyingModal";

const Market = () => {
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const renderCoins = () => {
    if (!results) return <div>Loading</div>;

    return results.map((el) => {
      return (
        <tr key={el.id}>
          <td className="coinNameAndImage">
            <img src={el.image} /> {el.name}
          </td>
          <td>₹{el.current_price}</td>
          <td>₹{el.market_cap}</td>
          <td>₹{el.high_24h}</td>
          <td>{el.low_24h}</td>
          <td>
            {!user ? null : (
              <BuyingModal
                coin={el.id}
                funds={user.fundsAvailable}
                price={el.current_price}
              />
            )}
          </td>
        </tr>
      );
    });
  };
  const getResult = async () => {
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "inr",
            per_page: 20,
            page,
          },
        }
      );

      setResults(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    // setInterval(getResult(), 1500);
    getResult();
  }, []);
  const getUser = (u) => {
    setUser(u);
  };

  return (
    <div className="market">
      <div className="marketContainer">
        <div className="marketContainerLeft">
          <SideMenu getUser={getUser} />
        </div>
        <div className="marketContainerRight">
          <div className="marketContainerRightContainer">
            <div className="marketContainerRightHead">
              <div className="marketContainerRightHeadContainer">
                <div className="marketContainerRightHeading">Market</div>
                <div className="marketContainerRightDate">10 jun 2022</div>
              </div>
            </div>
          </div>
          <div className="marketDataContainer">
            <div className="marketDataTable">
              <table>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Market Cap</th>
                  <th>24 hour high</th>
                  <th>24 hour low</th>
                  <th>Actions</th>
                </tr>
                {renderCoins()}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
