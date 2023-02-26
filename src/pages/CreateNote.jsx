import React, { useState, useEffect } from "react";

import client from "../utils/client";

import { Dropdown } from "../components";

const CreateNote = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const resp = await client.fetch(`*[_type == "templates"]`);
      setTemplates(resp);
    };

    fetchTemplates();
  }, []);

  return (
      <div className="mt-10 p-2">
        <div className="my-4">
          <h1 className="text-black text-3xl text-center">Create a new note</h1>
        </div>

        <main className="my-2 p-2 bg-gray-100">
          <div className="text-black">
            <h2 className="text-lg">Select a note template</h2>

            <Dropdown
              title="Templates"
              items={templates}
              type="templates"
            />
          </div>
        </main>
      </div>
  );
};

export default CreateNote;
