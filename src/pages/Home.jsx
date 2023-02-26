import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { Notes, EditNote, CreateNote } from "./";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import { TemplateDetailsContext } from "../context/templateDetails";

const Home = () => {
  const template = useContext(TemplateDetailsContext);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        template?.setTemplateDetails(true);
      } else {
        template?.setTemplateDetails(false);
        navigate("/login");
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<CreateNote />} />
      <Route path="/note/:slug" element={<EditNote />} />
      <Route path="/view-notes" element={<Notes />} />
    </Routes>
  );
};

export default Home;
