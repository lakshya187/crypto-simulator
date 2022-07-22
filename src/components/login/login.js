import React, { useState } from "react";
import { Link } from "react-router-dom";
import { server_url } from "../../config";
import axios from "axios";
import { setToken } from "../../utility/localStorage";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = { email, password };
      // console.log(data);
      const res = await axios.post(`${server_url}/api/user/log-in`, data);
      setToken(res.data.token);
      navigate("/market", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form className="signup">
      <div className="signupContainer">
        <div className="heading">Login!</div>
        <div className="signupForm">
          <div className="inputField">
            <label>Email</label>
            <input
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputField">
            <label>Password</label>
            <input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="signupBtnContainer">
        <button className="btn primaryBtn" onClick={(e) => handleSubmit(e)}>
          Login
        </button>
        <Link to={"/signup"} className="btn secondryBtn marginLeft">
          Signup
        </Link>
      </div>
    </form>
  );
};

export default Login;
