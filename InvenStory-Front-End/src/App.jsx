import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";

import Test from "./components/Test.jsx"; //! Development only
import ViewItems from "./components/ViewItems.jsx";

import "../src/components/CSS/App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const changeLoggedIn = async (newState) => {
    setLoggedIn(newState);
  };

  useEffect(() => {}), [];

  return (
    <div className="container-fluid background-image">
      <Header loggedIn={loggedIn} updatedLoggedIn={setLoggedIn} />
      <br />
      <Routes>
        <Route path="/" element={<ViewItems />} />
        <Route
          path="/SignUp"
          element={<SignUp setLoggedIn={changeLoggedIn} />}
        />
        <Route path="/Login" element={<Login setLoggedIn={changeLoggedIn} />} />
      </Routes>
      <Footer />
    </div>
  );
};

// !loggedIn ? <Login setLoggedIn={changeLoggedIn} /> : <ViewItems />

export default App;
