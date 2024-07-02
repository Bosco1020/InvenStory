import React from "react";

import AccountForm from "./AccountForm";

const Login = ({ setLoggedIn, logout, updateUser }) => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div>
          <h1> Please Log into your account</h1>
          <br />
          <br />
          <AccountForm
            changeLoggedIn={setLoggedIn}
            newAccount={false}
            setLogout={logout}
            user={updateUser}
          />
          <div className="d-flex justify-content-center">
            <p>Don't have an account?</p>
          </div>
          <div className="d-flex justify-content-center">
            <a className="nav-link" href="/SignUp" id="pageLink">
              Sign up here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
