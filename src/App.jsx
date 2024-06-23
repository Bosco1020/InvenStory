import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const changeLoggedIn = async (newState) => {
    setLoggedIn(newState);
  };

  useEffect(() => {}), [];

  return (
    <div className="container-fluid">
      <Routes>
        <Route
          path="/SignUp"
          element={<SignUp setLoggedIn={changeLoggedIn} />}
        />
        <Route path="/Login" element={<Login setLoggedIn={changeLoggedIn} />} />
      </Routes>
    </div>
  );
};

export default App;
