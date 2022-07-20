import React, { useEffect, useState } from "react";
import "./sideMenu.css";
import Dashboard from "../../assets/sidemenu icons/dashboard.svg";
import Portfolio from "../../assets/sidemenu icons/portfolio.svg";
import Logout from "../../assets/sidemenu icons/logout.svg";
import Market from "../../assets/sidemenu icons/market.svg";
import Watchlist from "../../assets/sidemenu icons/watchlist.svg";
import { getToken } from "../../utility/localStorage";
import { server_url } from "../../config";
import axios from "axios";
import { removeToken } from "../../utility/localStorage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SideMenu = ({ getUser }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);
  const location = useLocation();
  const findUrl = () => {
    const currentUrl = location.pathname;
    console.log(currentUrl);
  };
  const verify = async () => {
    try {
      const token = getToken();

      const { data } = await axios.post(`${server_url}/api/user/verify`, {
        token,
      });
      setUser(data.user);
      getUser(data.user);
    } catch (e) {
      navigate("/login", { replace: true });
      console.log(e);
    }
  };
  useEffect(() => {
    verify();
    findUrl();
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate("/login", { replace: true });
  };

  if (!user) return <div>Loading...</div>;
  return (
    <div className="sideMenu">
      <div className="sideMenuContainer">
        <div className="sideMenuTop">
          <div className="sideMenuTopBadge">
            <div> {user.name.split(" ")[0].slice(0, 1).toUpperCase()} </div>
          </div>
          <div className="sideMenuTopName">{user.name}</div>
        </div>
        <div className="sideMenuBody">
          <Link to={"/dashboard"} className="sideMenuBodyItem">
            <img src={Dashboard} />
            <div>Dashboard</div>
          </Link>
          <Link to={"/market"} className="sideMenuBodyItem">
            <img src={Market} />
            <div>Market</div>
          </Link>
          <Link to={"/portfolio"} className="sideMenuBodyItem">
            <img src={Portfolio} />
            <div>Portfolio</div>
          </Link>
          <Link to={"/watchlist"} className="sideMenuBodyItem">
            <img src={Watchlist} />
            <div>Watchlist</div>
          </Link>
          <div className="sideMenuBodyItem" onClick={() => handleLogout()}>
            <img src={Logout} />
            <div>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
