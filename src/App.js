import React from "react";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Portfolio from "./components/portfolio/portfolio";
import Login from "./components/login/login";
import Market from "./components/market/Market";
import Signup from "./components/signup/signup";
import Dashboard from "./components/dashboard/dashboard";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="market" element={<Market />} />
        <Route path="login" element={<Login />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
