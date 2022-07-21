import React, { Component } from "react";
import "./portfolio.css";
import SideMenu from "../sideMenu/sideMenu";
import axios from "axios";
import { server_url } from "../../config";
import { getToken } from "../../utility/localStorage";
import SellingModal from "../sellingModal/sellingModal";
class Portfolio extends Component {
  state = {
    currentUser: null,
    results: null,
    trades: null,
    tradeStatus: true,
    resultsStatus: true,
    sortedData: null,
    sortDataStatus: false,
  };
  getUser = (user) => {
    this.setState({ currentUser: user });
  };
  componentDidMount() {
    this.getTrades();
  }
  sortData = () => {
    if (this.state.trades && this.state.results) {
      let sortedData = [];
      this.state.trades.forEach((trade, i) => {
        const matchedTrade = this.state.results.find(
          (res) => trade.currency === res.id
        );
        sortedData.push({ matchedTrade, trade });
      });
      if (!this.state.sortDataStatus) {
        this.setState({ sortedData });
        this.setState({ sortDataStatus: true });
      }
    }
  };
  getTrades = async () => {
    try {
      const { data } = await axios.get(`${server_url}/api/trade/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      this.sortData();
      if (this.state.tradeStatus) {
        this.setState({ trades: data.data });
        this.setState({ tradeStatus: false });
      }
    } catch (e) {
      console.log(e);
    }
  };
  renderPortfolioData = async () => {
    if (this.state.currentUser) {
      if (this.state.currentUser.currentHoldings.length !== 0) {
        const baseUrl = "https://api.coingecko.com/api/v3/coins/markets";
        let holdins = "";
        this.state.currentUser.currentHoldings.forEach(
          (el) => (holdins += `${el},`)
        );
        holdins.slice(0, -1);

        const { data } = await axios.get(baseUrl, {
          params: {
            vs_currency: "inr",
            ids: holdins,
          },
        });
        this.sortData();
        if (this.state.resultsStatus) {
          this.setState({ results: data });
          this.setState({ resultsStatus: false });
        }
      }
    }
  };
  renderPortfolio = () => {
    if (this.state.sortedData) {
      return this.state.sortedData.map((el) => {
        console.log(el);
        return (
          <tr key={el.id}>
            <td>{el.matchedTrade.name}</td>
            <td>₹{el.trade.buyingPrice}</td>
            <td>₹{el.matchedTrade.current_price}</td>
            <td>₹{el.trade.sellingPrice}</td>
            <td
              className={
                (el.matchedTrade.current_price - el.trade.buyingPrice) *
                  el.trade.quantity >
                0
                  ? "greenColor"
                  : "redColor"
              }
            >
              ₹
              {(
                (el.matchedTrade.current_price - el.trade.buyingPrice) *
                el.trade.quantity
              ).toFixed(2)}
            </td>
            <td>{el.trade.quantity}</td>
            <td>₹{(el.trade.quantity * el.trade.buyingPrice).toFixed(2)}</td>
            <td>{new Date(el.trade.openDate).toDateString()}</td>
            <td>₹{el.trade.profitLoss.toFixed(2)}</td>
            <td>
              {!this.state.currentUser ? null : (
                <SellingModal
                  trade={el.trade._id}
                  currentPrice={el.matchedTrade.current_price}
                  priceBought={el.trade.buyingPrice}
                  quantity={el.trade.currentHoldings}
                />
              )}
            </td>
          </tr>
        );
      });
    }
    this.renderPortfolioData();
    return <div>Loading</div>;
  };
  render() {
    return (
      <div className="market">
        <div className="marketContainer">
          <div className="marketContainerLeft">
            <SideMenu getUser={this.getUser} />
          </div>
          <div className="marketContainerRight">
            <div className="marketContainerRightContainer">
              <div className="marketContainerRightHead">
                <div className="marketContainerRightHeadContainer">
                  <div className="marketContainerRightHeading">Portfolio</div>
                  <div className="marketContainerRightDate">10 jun 2022</div>
                </div>
              </div>
            </div>
            <div className="marketDataContainer">
              <div className="marketDataTable">
                <table>
                  <tr>
                    <th>Name</th>
                    <th>Buying Price</th>
                    <th>Current Market Price</th>
                    <th>Selling Price</th>
                    <th>MTM</th>
                    <th>Quantity</th>
                    <th>Trade Value</th>
                    <th>Bought on</th>
                    <th>Profit Loss</th>
                    <th>Actions</th>
                  </tr>
                  {this.renderPortfolio()}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
