import React, { useState, useEffect } from "react";

import client from "../utils/client";

import { Card, Loader } from "../components";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchNotes = async () => {
      const resp = await client.fetch(`*[_type == "notes"]`);
      setNotes(resp);
    };
    try {
      fetchNotes();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <div className="absolute top-1/2 left-1/2">{loading && <Loader />}</div>

      <h1 className="text-black text-center my-2 font-semibold">All notes</h1>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {notes?.reverse()?.map((note) => {
          return (
            <Card
              key={note?._id}
              title={note?.title}
              content={note?.note}
              slug={note?.slug}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Notes;
