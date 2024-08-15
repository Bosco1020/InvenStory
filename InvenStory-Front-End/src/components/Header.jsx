import { NavLink } from "react-router-dom";
import React from "react";
import { useEffect } from "react";

import "./CSS/Header.css";

const Header = ({ loggedIn, updateLogout }) => {
  const logout = () => {
    updateLogout(true);
  };

  useEffect(() => {
    // if (localStorage.getItem("user")) {
    //   updatedLoggedIn(true);
    // } else updatedLoggedIn(false);
  }),
    [];

  return (
    <header
      className="header-custom container-fluid  text-center fixed-top"
      style={{ backgroundColor: "#d4b200", color: "white" }} //#47aeed
    >
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <nav className="navbar">
            <img className="DFLogo" src="/assets/Logo.png" href="/" />
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
                {!loggedIn ? (
                  <li className="nav-item">
                    <a className="nav-link link-text" href="/Login">
                      Login
                    </a>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <button
                        type="button"
                        className="btn"
                        onClick={(e) => logout()}
                      >
                        <a className="nav-link link-text">Logout</a>
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </nav>
    </header>
  );
};

export default Header;
