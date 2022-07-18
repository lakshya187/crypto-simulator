import React from "react";
import SideMenu from "../sideMenu/sideMenu";
import "./Market.css";

const Market = () => {
  return (
    <div className="market">
      <div className="marketContainer">
        <div className="marketContainerLeft">
          <SideMenu />
        </div>
        <div className="marketContainerRight">
          <div className="marketContainerRightHead">
            <div className="marketContainerRightHeadContainer">
              <div className="marketContainerRightHeading">Market</div>
              <div className="marketContainerRightDate">10 jun 2022</div>
            </div>
            <div className="marketContainerRightSearch">
              <input placeholder="Search for currencies" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
