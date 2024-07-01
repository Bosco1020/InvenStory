import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";

import { logout } from "./service/auth.service.js";

import Test from "./components/Test.jsx"; //! Development only
import ViewItems from "./components/ViewItems.jsx";

import "../src/components/CSS/App.css";

const App = () => {
  const [loggedIn, setLogIn] = useState(false);
  const [changeLog, setChangeLog] = useState(false);

  let navigate = useNavigate();

  // const changeLoggedIn = async (newState) => {
  //   changeLog = newState;
  // };

  useEffect(() => {
    console.log(changeLog + " " + loggedIn);
    if (loggedIn == changeLog) return;

    const updateLoggedIn = async () => {
      setChangeLog(loggedIn);
      if (loggedIn == true) navigate(`/`);
      else {
        logout();
        navigate(`/Login`);
      }
    };
    updateLoggedIn();
  }),
    [];

  return (
    <div className="container-fluid background-image">
      <Header loggedIn={loggedIn} updatedLoggedIn={setLogIn} />
      <br />
      <Routes>
        <Route path="/" element={<ViewItems />} />
        <Route path="/SignUp" element={<SignUp setLoggedIn={setLogIn} />} />
        <Route path="/Login" element={<Login setLoggedIn={setLogIn} />} />
      </Routes>
      <Footer />
    </div>
  );
};

// !loggedIn ? <Login setLoggedIn={changeLoggedIn} /> : <ViewItems />

export default App;
