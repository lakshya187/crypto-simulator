import React, { useState } from "react";
import "./signup.css";
import { server_url } from "../../config";
import axios from "axios";
import { setToken } from "../../utility/localStorage";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = { name, email, password, confirmPassword };

      const res = await axios.post(`${server_url}/api/user/sign-up`, data);
      setToken(res.data.token);
      navigate("/market", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form className="signup">
      <div className="signupContainer">
        <div className="heading">Signup!</div>
        <div className="signupForm">
          <div className="inputField">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
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
          <div className="inputField">
            <label>Confirm Password</label>
            <input
              type={"password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="signupBtnContainer">
        <button className="btn primaryBtn" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
        <Link to={"/login"} className="btn secondryBtn marginLeft">
          Login
        </Link>
      </div>
    </form>
  );
};

export default Signup;
