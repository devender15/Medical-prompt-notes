import React, { Fragment, useRef, useState, memo, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import uuid from "react-uuid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import notify from "../utils/toast";
import client from "../utils/client";

import { FieldModal } from "./";

const Modal = ({ open, setOpen, heading, type }) => {
  const cancelButtonRef = useRef(null);
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [fields, setFields] = useState([]);
  const [templateTitle, setTemplateTitle] = useState("");
  const [editable, setEditable] = useState(false);
  const [editableField, setEditableField] = useState(null);
  const [bodyText, setBodyText] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");

  const createTemplate = async () => {
    const resp = await client.create({
      _type: "templates",
      name: templateTitle,
      bodyText: bodyText,
    });
    notify(toast, "Template created !", "success");

    // resetting all the values
    setBodyText([]);
    setTemplateTitle("");
    setOpen(false);
  };

  const handleRemoveField = (index) => {
    const newKeywords = [...bodyText];
    newKeywords.splice(index, 1);
    setBodyText(newKeywords);
  };

  const handleEditField = (name) => {
    setEditableField(() => {
      const idx = bodyText?.findIndex((field) => field?.name === name);
      return idx;
    });
    setEditable(true);
    setShowFieldModal(true);
  };

  const handleInputChange = (event) => {
    setCurrentKeyword(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (currentKeyword.trim()) {
        const newKeyword = {
          _key: uuid(),
          text: currentKeyword.trim(),
          isField: false,
          name: '',
          label: '',
          type: '',
        };
        if (newKeyword.text) {
          setBodyText([...bodyText, newKeyword]);
        }
        setCurrentKeyword("");
      }
    }
  };

  useEffect(() => {
    setBodyText((prev) => {
      let newArray = [...prev];
      const newField = fields.pop();
      if (editable) {
        const promptIndex = newArray?.findIndex(
          (item) => item?._key === newField?._key
        );
        newArray?.splice(promptIndex, 1, newField);
      } else {
        if (newField) newArray.push({ ...newField, _key: uuid() });
      }
      return newArray;
    });
  }, [fields]);

  return (
    <>
      <FieldModal
        open={showFieldModal}
        setOpen={setShowFieldModal}
        editableField={editableField}
        fields={fields}
        // setEditableField={setEditableField}
        setFields={setFields}
        editable={editable}
      />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ClipboardDocumentListIcon
                          className="h-6 w-6 text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {heading}
                        </Dialog.Title>
                        <div className="mt-2 w-full">
                          {type === "templates" ? (
                            <>
                              <form className="w-full flex flex-col space-y-3">
                                <div className="my-4 w-full">
                                  <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Name
                                  </label>
                                  <div className="relative mt-1 rounded-md shadow-sm w-full">
                                    <input
                                      type="text"
                                      name="name"
                                      id="name"
                                      value={templateTitle}
                                      onChange={(e) =>
                                        setTemplateTitle(e.target.value)
                                      }
                                      className="block text-lg w-full rounded-md border-gray-300 py-1 px-2 bg-gray-200  text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      placeholder="Template name"
                                    />
                                  </div>
                                </div>

                                <div className="my-4 w-full">
                                  <label
                                    htmlFor="note-text"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Note body
                                  </label>

                                  <div className="relative mt-4 rounded-md shadow-sm w-full">
                                    <div className="h-[20rem] overflow-y-auto cursor-text p-2 w-full bg-gray-200 rounded-md ">
                                      {bodyText.map((item, idx) =>
                                        item?.isField ? (
                                          <div
                                            key={idx}
                                            className="flex items-center space-x-4"
                                          >
                                            <p className="text-black uppercase font-semibold">
                                              {" "}
                                               ~ {item?.label} ~
                                            </p>

                                            <div>
                                              <button
                                                type="button"
                                                className="bg-transparent border-none outline-none p-0 text-blue-500 hover:text-blue-700 "
                                                onClick={() =>
                                                  handleEditField(item?.label)
                                                }
                                              >
                                                Edit
                                              </button>
                                            </div>

                                            <div>
                                              <button
                                                type="button"
                                                className="bg-transparent border-none p-0 text-red-500 hover:text-red-700 "
                                                onClick={() =>
                                                  handleRemoveField(idx)
                                                }
                                              >
                                                Remove
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <p
                                            key={idx}
                                            className="text-black p-2"
                                          >
                                            {item?.text}
                                          </p>
                                        )
                                      )}
                                      <input
                                        type="text"
                                        value={currentKeyword}
                                        onChange={handleInputChange}
                                        onKeyDown={handleInputKeyDown}
                                        className="p-2 w-full bg-transparent border-none outline-none text-black"
                                        placeholder="Write here"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </form>
                              <button
                                className="mt-4 inline-flex w-full justify-center rounded-md border border-gray-300 bg-blue-600 text-white px-4 py-2 text-base font-medium shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-2  sm:w-auto sm:text-sm"
                                onClick={() => {
                                  setEditable(false);
                                  setShowFieldModal(true);
                                }}
                              >
                                Add prompt
                              </button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-gray-400"
                      onClick={createTemplate}
                      disabled={!templateTitle || bodyText?.length === 0}
                    >
                      Create
                    </button>

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <ToastContainer />
    </>
  );
};

export default memo(Modal);
