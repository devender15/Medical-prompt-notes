import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import client from "../utils/client";
import slugify from "../utils/slugify";
import notify from "../utils/toast";

import { NotFound } from ".";

const Note = () => {
  const { slug } = useParams();
  const [note, setNote] = useState({});
  const [template, setTemplate] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchNote = async () => {
      const resp = await client.fetch(
        `*[_type == "notes" && slug == "${slug}"][0]{
          ...,
          "referenced": *[_type == "templates" && _id == "\(template._ref)"]
        }`
      );
      setNote(() => {
        let newObj = resp;
        setFormData(() => {
          let data = JSON.parse(newObj?.structure);
          data = {
            ...data,
            "note-title": newObj?.title,
            pname: newObj?.patient,
          };
          return data;
        });
        return newObj;
      });
    };
    fetchNote();
  }, [slug]);

  useEffect(() => {
    const fetchTemplate = async () => {
      const response = await client.fetch(
        `*[_type == "templates" && _id == "${note?.template?._ref}"][0]`
      );
      setTemplate(response);
    };
    fetchTemplate();
  }, [note]);

  const handleUpdateNote = (e) => {
    e.preventDefault();

    // Generate the note based on the selected template and user input
    const finalnote = `--- ${formData["note-title"]} ---\n
        ${template?.fields
          .map((field) => `${field.label}: ${formData[field.name]}`)
          .join("\n")}
        `;

    let finalNote = {
      structure: JSON.stringify(formData),
      patient: formData["pname"],
      title: formData["note-title"],
      template: { _ref: note?.template?._ref, _type: "reference" },
      note: finalnote,
      slug: slugify(formData["note-title"]),
    };

    client
      .patch(note?._id)
      .set(finalNote)
      .commit()
      .then(() => {
        notify(toast, "Note updated successfully!", "success");
      })
      .catch(() => notify(toast, "Something went wrong!", "error"));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {!note ? (
        <NotFound />
      ) : (
        <section className="mt-6">
          <h1 className="text-center text-black text-3xl">Edit your note</h1>

          <div className="my-4 p-2 rounded-md bg-white shadow-md w-1/2 mx-auto">
            <form className="mt-8 space-y-6" onSubmit={handleUpdateNote}>
              <div>
                <label htmlFor="note-title" className="sr-only">
                  Note Title
                </label>
                <input
                  type="text"
                  id="note-title"
                  name="note-title"
                  placeholder="Note title"
                  value={formData["note-title"]}
                  onChange={handleInputChange}
                  required
                  className="bg-white capitalize relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="pname" className="sr-only">
                  Patient's Name
                </label>
                <input
                  type="text"
                  id="pname"
                  name="pname"
                  placeholder="Patient's name"
                  value={formData?.pname}
                  onChange={handleInputChange}
                  required
                  className="bg-white capitalize relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {template?.fields?.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="sr-only text-black">
                    {field.label}:
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      placeholder={field.label}
                      className="mt-1 bg-white p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  ) : field?.type === "h1" ? (
                    <>
                      <div className="w-full text-left">
                        <h1
                          id={field?.name}
                          name={field?.name}
                          className="text-xl md:text-2xl text-black"
                        >
                          {field?.label}
                        </h1>
                      </div>
                    </>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      placeholder={field.label}
                      required
                      className="bg-white capitalize relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  )}
                </div>
              ))}
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update note
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default Note;
