import React, { useEffect, useState } from "react";
import "./App.css";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { Routes, Route, useNavigate } from "react-router-dom";

import { Home, Login, Register } from "./pages/";
import { Navbar } from "./components";

function App() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedin(true);
      } else {
        console.log(user);
        setIsLoggedin(false);
        navigate("/login");
      }
    });
  }, [auth]);

  return (
    <>
      <Navbar isLoggedin={isLoggedin} />
      <Routes>
        <Route exact path="/*" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
