import React, { useState, useEffect } from "react";

import client from "../utils/client";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const resp = await client.fetch(`*[_type == "notes"]`);
      setNotes(resp);
    };

    fetchNotes();
  }, []);

  return (
    <div>
      {notes?.map((note) => {
        return (<p key={note?._id} className="text-black">{note?.title}</p>)
      })}
    </div>
  );
};

export default Notes;
