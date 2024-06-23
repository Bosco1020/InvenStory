import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { login, signUp } from "../service/auth.service.js";
import {
  validateEmail,
  validatePassword,
} from "../middleware/form.validation.js";

import "./CSS/Form.css";

const AccountForm = ({ changeLoggedIn, newAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [goodEmail, setGoodEmail] = useState("Valid");
  const [goodPassword, setGoodPassword] = useState("Valid");

  let navigate = useNavigate();

  const updateEmailValidation = (updateEmail) => {
    if (!newAccount) return; //Only show help text if creating
    if (validateEmail(updateEmail)) setGoodEmail("Valid");
    else setGoodEmail("Invalid");
  };

  const updatePasswordValidation = (updatePassword) => {
    if (!newAccount) return;
    if (validatePassword(updatePassword)) setGoodPassword("Valid");
    else setGoodPassword("Invalid");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goodEmail || !goodPassword) return;

    let response;
    if (!newAccount) {
      response = await login(email, password);
      if (localStorage.getItem("user")) changeLoggedIn(true); //? May not need
    } else {
      response = await signUp(email, password);
      if (response._id) navigate(`/Login`);
    }

    console.log(response);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      changeLoggedIn(true);
      navigate(`/`); // redirect if already logged in
    }
    /* //? Check if need, should be ok without
    if (localStorage.getItem("user")) {
      changeLoggedIn(true);
    } else changeLoggedIn(false);
    */
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
              className={`Input${goodEmail}`}
              id="emailInput"
              value={email}
              placeholder="example@email.com"
              onChange={(e) => {
                setEmail(e.target.value);
                updateEmailValidation(e.target.value);
              }}
            />
          </label>
          {goodEmail == "Invalid" ? (
            <>
              <br />
              <label>
                <p className="Invalid">Please enter a valid email address</p>
              </label>
            </>
          ) : (
            <></>
          )}
          <br />
          <br />
          <label>
            Enter your Password:
            <input
              type="password"
              name="passwordInput"
              className={`Input${goodPassword}`}
              id="passwordInput"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
                updatePasswordValidation(e.target.value);
              }}
            />
          </label>
          {goodPassword == "Invalid" ? (
            <>
              <br />
              <label>
                <>Password must be at least 8 characters long,</>
                <br />
                <>contain 1 uppercase letter,</>
                <br />
                <>a number and a special character</>
                <br />
              </label>
            </>
          ) : (
            <></>
          )}
          <br />
          <br />
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
};

// disabled={() => {
//                 return newAccount || (goodEmail && goodPassword);
//               }}

export default AccountForm;
