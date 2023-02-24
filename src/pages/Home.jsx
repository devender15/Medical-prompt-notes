import React from "react";
import { Routes, Route } from "react-router-dom";

import { Notes, Note, CreateNote } from "./";

import TemplateDetails from "../context/templateDetails";

const Home = () => {
  return (
    <TemplateDetails>
      <Routes>
        <Route path="/" element={<CreateNote />} />
        <Route path="/view-notes" element={<Notes />} />
        <Route path="/note/:slug" element={<Note />} />
      </Routes>
    </TemplateDetails>
  );
};

export default Home;
