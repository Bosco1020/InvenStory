import React from "react";

import AccountForm from "./AccountForm";

const SignUp = ({ setLoggedIn, logout, updateUser }) => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div>
          <h1> Please Enter your Account Details</h1>
          <br />
          <br />
          <AccountForm
            changeLoggedIn={setLoggedIn}
            newAccount={true}
            setLogout={logout}
            user={updateUser}
          />
          <div className="d-flex justify-content-center">
            <p>Already have an account?</p>
          </div>
          <div className="d-flex justify-content-center">
            <a className="nav-link" href="/Login" id="pageLink">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
