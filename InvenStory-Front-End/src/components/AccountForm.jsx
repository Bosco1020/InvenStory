import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useState } from "react";

const AccountForm = ({ changeLoggedIn, newAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("user")) {
      // check for "user" token
      changeLoggedIn(true);
      navigate(`/`); // send after login
    } else {
      changeLoggedIn(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      changeLoggedIn(true);
    } else changeLoggedIn(false);
  }),
    [];

  return (
    <div className="d-flex justify-content-center">
      <div className="">
        <form onSubmit={handleSubmit}>
          <label>
            Enter your Email Address:
            <input
              type="text"
              name="emailInput"
              className="InputEmail"
              id="emailInput"
              value={email}
              placeholder="example@email.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <br />
          <br />
          <label>
            Enter your Password:
            <input
              type="password"
              name="passwordInput"
              className="InputPassword"
              id="passwordInput"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <br />
          <br />
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={() => {
                return newAccount;
              }}
            >
              Submit
            </button>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
