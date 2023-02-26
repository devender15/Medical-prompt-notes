import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import { Home, Login, Register } from "./pages/";
import { Navbar } from "./components";

import TemplateDetails from "./context/templateDetails";

function App() {
  return (
    <TemplateDetails>
      <Navbar />
      <Routes>
        <Route exact path="/*" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </TemplateDetails>
  );
}

export default App;
