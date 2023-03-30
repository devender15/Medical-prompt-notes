import React, { useState, useEffect } from "react";

import client from "../utils/client";
import slugify from "../utils/slugify";
import notify from "../utils/toast";

import { Dropdown, Template, NoteModal } from "../components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNote = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [formData, setFormData] = useState({});
  const [showNote, setShowNote] = useState(false);
  const [finalNoteObj, setFinalNoteObj] = useState({});
  const [open, setOpen] = useState(false);

  // new 
  const [openTemplateModal, setOpenTemplateModal] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      const resp = await client.fetch(`*[_type == "templates"]`);
      setTemplates(resp);
    };

    fetchTemplates();
  }, []);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCreateNote = (e) => {
    e.preventDefault();
    // pushing data to our db
    client
      .create({
        _type: "notes",
        title: formData["note-title"],
        patient: formData?.pname,
        template: {
          _ref: selectedTemplate?._id,
          _type: "reference",
        },
        structure: JSON.stringify(formData),
        slug: slugify(formData["note-title"] || ""),
        date: new Date().toISOString(),
      })
      .then(() => notify(toast, "Note created successfully!", "success"))
      .catch(() => notify(toast, "Something went wrong!", "error"));
    setShowNote(true);
  };

  const handleSelect = (template) => {
    setOpen(true);
    setSelectedTemplate(template);
  }

  return (
    <div className="mt-10">
      <div className="my-4">
        <h1 className="text-black text-3xl text-center">Create a new note</h1>
      </div>

      <Template openTemplateModal={openTemplateModal} setOpenTemplateModal={setOpenTemplateModal} />

      <main className="my-2 bg-gray-100 p-2 overflow-hidden">
        <div className="text-black">
          <h2 className="text-lg">Select a note template</h2>

          {/* <Dropdown
            title="Templates"
            items={templates}
            type="templates"
            selectVal={setSelectedTemplate}
          /> */}

          {/* <select className="select select-accent bg-white w-full max-w-xs">
            <option disabled selected>
              Select
            </option>
            {
              templates?.map(option => (
                <option value={option}>{option.name}</option>
              ))
            }
            <option><button onClick={() => setOpenTemplateModal(true)}>New template</button></option>
          </select> */}

          <div className="w-full md:w-1/2 mt-4 mx-auto flex flex-col space-y-4 justify-center md:flex-row items-start md:space-x-4 md:space-y-0">
            <div className="w-full md:basis-1/2 h-60 overflow-y-auto p-2 bg-white shadow-sm rounded-xl flex flex-col gap-4 text-left">
              {templates?.map((template, index) => (
                <p key={index} onClick={() => handleSelect(template)} className="w-full px-2 cursor-pointer hover:bg-gray-200">{template.name}</p>
              ))}
            </div>

            <button className="btn btn-warning" onClick={() => setOpenTemplateModal(true)}>New template</button>
          </div>
        </div>
        <hr />

        {/* {Object.keys(selectedTemplate)?.length > 0 ? (
          <section className="mt-6 text-black w-full">
            <h3 className="text-lg font-semibold capitalize">
              {selectedTemplate?.name}
            </h3>

            <div className="my-4 p-2 rounded-md bg-white shadow-md w-full md:w-1/2 mx-auto">
              <form className="mt-8 space-y-2" onSubmit={handleCreateNote}>
                <div>
                  <label htmlFor="note-title" className="sr-only">
                    Note Title
                  </label>
                  <input
                    type="text"
                    id="note-title"
                    name="note-title"
                    placeholder="Note title"
                    value={formData["title"]}
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
                    value={formData["pname"]}
                    onChange={handleInputChange}
                    required
                    className="bg-white capitalize relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {selectedTemplate?.bodyText?.map((item) => (
                  <div key={item._id}>
                    <label htmlFor={item.name} className="sr-only text-black">
                      {item.label}:
                    </label>
                    {!item?.isField ? (
                      <p className="text-black text-lg text-left">
                        {item?.text}
                      </p>
                    ) : (
                      <input
                        type={item.type}
                        id={item.name}
                        name={item.name}
                        value={formData[item.name] || ""}
                        onChange={handleInputChange}
                        placeholder={item.label}
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
                    Create note
                  </button>
                </div>
              </form>
            </div>
          </section>
        ) : (
          <p className="text-yellow-500 my-6 text-3xl font-semibold text-center">
            Select a template
          </p>
        )} */}

        {showNote ? (
          <>
            <hr />
            <section className="my-4 p-2 text-black">
              <h2 className="text-3xl text-center">Final note</h2>

              <div className="bg-white p-2 rounded-md break-words w-full md:w-1/2 mx-auto my-2  space-y-2">
                {/* <p> ---- {formData["note-title"]} ---- </p>
                <p> Patient's name: {formData["pname"]} </p>
                {Object.keys(finalNoteObj)?.map((content) => (
                  <p>{content?.text}</p>
                ))} */}
                {/* {Object.keys(formData)?.map((line, idx) =>
                  line === "note-title" ? (
                    <p key={idx}> ---- {formData[line]} ----</p>
                  ) : (
                    <div
                      key={idx}
                      className="flex items-center justify-start w-1/2 mx-auto mt-4"
                    >
                      <p className="font-semibold mr-4 capitalize">
                        {line === "pname" ? "Patient's name" : line} :{" "}
                      </p>
                      <span className="capitalize">{formData[line]}</span>
                    </div>
                  )
                )} */}
              </div>
            </section>
          </>
        ) : null}
      </main>
      <ToastContainer />
      <NoteModal open={open} setOpen={setOpen} template={selectedTemplate} />
    </div>
  );
};

export default CreateNote;
