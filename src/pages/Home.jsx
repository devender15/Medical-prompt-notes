import React from "react";
import { Routes, Route } from "react-router-dom";

import { Notes, Note, CreateNote } from "./";

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateNote />} />
      <Route path="/view-notes" element={<Notes />} />
      <Route path="/note/:slug" element={<Note />} />
    </Routes>
  );
};

export default Home;
