import React, { useEffect, useState } from "react";
import "./dashboard.css";
import SideMenu from "../sideMenu/sideMenu";
import { server_url } from "../../config";
import { getToken } from "../../utility/localStorage";
import axios from "axios";
import PieChart from "./pieChart";

const Dashboard = () => {
  const [currentUser, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const getUser = (user) => {
    setUser(user);
  };

  const getStats = async () => {
    const { data } = await axios.get(`${server_url}/api/trade/get-stats`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    setStats(data.data[0]);
  };
  useEffect(() => {
    getStats();
  }, []);

  const renderStats = () => {
    if (!stats) return <div style={{ color: "#fff" }}>No data found</div>;
    return (
      <div className="dashboardStats">
        <div className="statsheading heading">Statistcs</div>
        <div className="dashboardStatsItemContainer">
          <div className="dashboardStatsItem">
            <div className="dashboardStatsDescription">Total Trades:</div>{" "}
            <div className="dashboardStatsValue">{stats.numberOfTrades}</div>
          </div>
          <div className="dashboardStatsItem">
            <div className={`dashboardStatsDescription `}>Net Returns :</div>{" "}
            <div
              className={`dashboardStatsValue ${
                stats.netProfitLoss > 0 ? "greenColor" : "redColor"
              }`}
            >
              ₹{stats.netProfitLoss.toFixed(2)}
            </div>
          </div>
          <div className="dashboardStatsItem">
            <div className="dashboardStatsDescription">Total Profit :</div>{" "}
            <div className="dashboardStatsValue greenColor">
              ₹{stats.totalProfit.toFixed(2)}
            </div>
          </div>
          <div className="dashboardStatsItem">
            <div className="dashboardStatsDescription">Total Loss :</div>{" "}
            <div className="dashboardStatsValue redColor">
              ₹{stats.totalLoss.toFixed(2)}
            </div>
          </div>
          <div className="dashboardStatsItem">
            <div className="dashboardStatsDescription">Profit Trades :</div>{" "}
            <div className="dashboardStatsValue">{stats.profitTrades}</div>
          </div>
          <div className="dashboardStatsItem">
            <div className="dashboardStatsDescription">Loss Trades :</div>{" "}
            <div className="dashboardStatsValue">{stats.lossTrades}</div>
          </div>
        </div>
      </div>
    );
  };
  console.log(stats);
  const renderChart = () => {
    if (!stats) return <div style={{ color: "#fff" }}>No data to Show</div>;
    const data = [stats.totalProfit.toFixed(2), stats.totalLoss.toFixed(2)];
    return <PieChart profitLoss={data} />;
  };
  const renderUserInfo = () => {
    if (!currentUser) return <div>No user found</div>;
    console.log(currentUser);
    return (
      <div className="dashboardUserData">
        <div className="dashboardStatsItem">
          <div className="dashboardStatsDescription">Available funds:</div>{" "}
          <div className="dashboardStatsValue">
            {currentUser.fundsAvailable.toFixed(2)}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="dashboardStatsDescription">Starting funds :</div>{" "}
          <div className="dashboardStatsValue">
            {currentUser.startingFunds.toFixed(2)}
          </div>
        </div>
        <div className="dashboardStatsItem">
          <div className="dashboardStatsDescription">Return % :</div>{" "}
          <div
            className={`dashboardStatsValue ${
              (
                currentUser.startingFunds.toFixed(2) /
                currentUser.fundsAvailable.toFixed(2) /
                100
              ).toFixed(2) > 0
                ? "greenColor"
                : "redColor"
            }  `}
          >
            {(
              currentUser.startingFunds.toFixed(2) /
              currentUser.fundsAvailable.toFixed(2) /
              100
            ).toFixed(0)}
            %
          </div>
        </div>
      </div>
    );
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
                <div className="marketContainerRightHeading">Dashboard</div>
                <div className="marketContainerRightDate">
                  {" "}
                  {new Date(Date.now()).toDateString()}
                </div>
              </div>
            </div>
          </div>
          <div className="dashboardStatsContainer">
            <div className="dashboardStatsLeft">
              <div className="dashboardUserInfo">{renderUserInfo()}</div>
              <div className="dashboardChart">{renderChart()}</div>
            </div>
            <div className="dashboardStatsRight">{renderStats()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
