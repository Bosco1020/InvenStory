import { NavLink } from "react-router-dom";
import React from "react";
import { useEffect } from "react";

import "./CSS/Header.css";

const Header = ({ loggedIn, updatedLoggedIn }) => {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      updatedLoggedIn(true);
    } else updatedLoggedIn(false);
  }),
    [];

  return (
    <header
      className="header-custom container-fluid  text-center fixed-top"
      style={{ backgroundColor: "#47aeed", color: "white" }}
    >
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <nav className="navbar">
            <div className="container">
              <a className="navbar-brand" href="/"></a>
              <img className="DFLogo" src="/assets/Logo.svg" href="/" />
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">
                      Home
                    </a>
                  </li>
                  {!loggedIn ? (
                    <li className="nav-item">
                      <a className="nav-link" href="/Login">
                        Login
                      </a>
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </nav>
    </header>
  );
};

export default Header;
