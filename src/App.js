import React from "react";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/login/login";
import Market from "./components/market/Market";
import Signup from "./components/signup/signup";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="market" element={<Market />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
