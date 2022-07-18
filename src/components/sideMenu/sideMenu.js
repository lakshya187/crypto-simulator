import React from "react";
import "./sideMenu.css";
import Dashboard from "../../assets/sidemenu icons/dashboard.svg";
import Portfolio from "../../assets/sidemenu icons/portfolio.svg";
import Logout from "../../assets/sidemenu icons/logout.svg";
import Market from "../../assets/sidemenu icons/market.svg";
import Watchlist from "../../assets/sidemenu icons/watchlist.svg";

const SideMenu = () => {
  return (
    <div className="sideMenu">
      <div className="sideMenuContainer">
        <div className="sideMenuTop">
          <div className="sideMenuTopBadge">JD</div>
          <div className="sideMenuTopName">John Doe</div>
        </div>
        <div className="sideMenuBody">
          <div className="sideMenuBodyItem">
            <img src={Dashboard} />
            <div>Dashboard</div>
          </div>
          <div className="sideMenuBodyItem">
            <img src={Market} />
            <div>Market</div>
          </div>
          <div className="sideMenuBodyItem">
            <img src={Portfolio} />
            <div>Portfolio</div>
          </div>
          <div className="sideMenuBodyItem">
            <img src={Watchlist} />
            <div>Watchlist</div>
          </div>
          <div className="sideMenuBodyItem">
            <img src={Logout} />
            <div>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
