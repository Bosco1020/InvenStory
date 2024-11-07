import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { login, signUp } from "../service/auth.service.js";
import {
  validateEmail,
  validatePassword,
} from "../middleware/form.validation.js";

import "./CSS/Form.css";

const AccountForm = ({ changeLoggedIn, newAccount, setLogout, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [goodEmail, setGoodEmail] = useState("Valid");
  const [goodPassword, setGoodPassword] = useState("Valid");
  const [goodUserName, setGoodUserName] = useState("Valid");

  let navigate = useNavigate();

  const updateEmailValidation = (updateEmail) => {
    if (!newAccount) return; //Only show help text if creating
    if (validateEmail(updateEmail)) changeEmail("Valid");
    else changeEmail("Invalid");
  };

  const updatePasswordValidation = (updatePassword) => {
    if (!newAccount) return;
    if (validatePassword(updatePassword)) changePassword("Valid");
    else changePassword("Invalid");
  };

  const updateUserNameValidation = (updateUsername) => {
    if (!newAccount) return;
    if (updateUsername.trim().length > 0) changeUsername("Valid");
    else changeUsername("Invalid");
  };

  const changeEmail = (state) => {
    setGoodEmail(state);
  };

  const changePassword = (state) => {
    setGoodPassword(state);
  };

  const changeUsername = (state) => {
    setGoodUserName(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      goodEmail == "Invalid" ||
      goodPassword == "Invalid" ||
      goodUserName == "Invalid"
    )
      return;

    let response;
    if (!newAccount) {
      response = await login(userName, email, password);
      if (localStorage.getItem("user")) {
        user(response);
        changeLoggedIn(true);
        setLogout(false);
      }
    } else {
      response = await signUp(userName, email, password);
      if (response._id) navigate(`/Login`);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate(`/`);
    }
  }),
    [];

  return (
    <div className="d-flex justify-content-center text-center">
      <div className="">
        <form onSubmit={handleSubmit}>
          <label>
            Enter your User Name <br />
            <input
              type="text"
              name="nameInput"
              className={`Input${goodUserName}`}
              id="NameInput"
              value={userName}
              placeholder="YourName"
              onChange={(e) => {
                setUserName(e.target.value);
                updateUserNameValidation(e.target.value);
              }}
            />
          </label>
          {goodUserName == "Invalid" ? (
            <>
              <br />
              <label>
                <p className="Invalid">Please enter a User Name</p>
              </label>
            </>
          ) : (
            <></>
          )}
          <br />
          <br />
          <label>
            Enter your Email Address <br />
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
            <>
              <br />
            </>
          )}

          <br />
          <label>
            Enter your Password <br />
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

export default AccountForm;
