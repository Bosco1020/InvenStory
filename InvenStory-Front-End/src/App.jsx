import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";

import { logout } from "./service/auth.service.js";

import ViewItems from "./components/ViewItems.jsx";

import "../src/components/CSS/App.css";

const App = () => {
  const [loggedIn, setLogIn] = useState(Boolean);
  const [loggedOut, logOut] = useState(false);
  const [User, setUser] = useState({});

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) setLogIn(true);
    if (loggedIn == !loggedOut) return;

    const updateLoggedIn = async () => {
      if (loggedOut) {
        setLogIn(false);
        logout();
        navigate(`/Login`);
      } else if (loggedIn) {
        navigate(`/`);
      }
    };
    updateLoggedIn();
  }),
    [];

  return (
    <div className="container-fluid background-image">
      <Header loggedIn={loggedIn} updateLogout={logOut} />
      <br />
      <Routes>
        <Route path="/" element={<ViewItems />} />
        <Route
          path="/SignUp"
          element={
            <SignUp
              setLoggedIn={setLogIn}
              logout={logOut}
              updateUser={setUser}
            />
          }
        />
        <Route
          path="/Login"
          element={
            <Login
              setLoggedIn={setLogIn}
              logout={logOut}
              updateUser={setUser}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

// !loggedIn ? <Login setLoggedIn={changeLoggedIn} /> : <ViewItems />

export default App;
