import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  memo,
  useContext,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

import { Dropdown } from "./";
import client from "../utils/client";

import { TemplateDetailsContext } from "../context/templateDetails";

const Modal = ({ open, setOpen, heading, type }) => {
  const cancelButtonRef = useRef(null);
  const [prompts, setPrompts] = useState([]);
  const detailsTemplate = useContext(TemplateDetailsContext);


  const handleTemplateSubmission = () => {};

  const handlePromptSubmission = () => {};

  useEffect(() => {
    const fetchPrompts = async () => {
      const resp = await client.fetch(`*[_type == "prompt"]`);
      setPrompts(resp);
    };

    fetchPrompts();
  }, []);

  return (
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
                            <form
                              className="w-full flex flex-col space-y-3"
                              onSubmit={
                                type === "templates"
                                  ? handleTemplateSubmission
                                  : handlePromptSubmission
                              }
                            >
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
                                    value={
                                      detailsTemplate?.templateDetails?.title
                                    }
                                    onChange={(e) =>
                                      detailsTemplate?.setTemplateDetails({
                                        ...detailsTemplate?.templateDetails,
                                        title: e.target.value,
                                      })
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
                                  Note text
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm w-full">
                                  <textarea
                                    id="note-text"
                                    value={
                                      detailsTemplate?.templateDetails?.text
                                    }
                                    onChange={(e) =>
                                      detailsTemplate?.setTemplateDetails({
                                        ...detailsTemplate?.templateDetails,
                                        text: e.target.value,
                                      })
                                    }
                                    className="block text-lg w-full rounded-md border-gray-300 py-1 px-2 bg-gray-200  text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    name="note-text"
                                    cols="30"
                                    rows="10"
                                  ></textarea>
                                </div>
                              </div>

                              <div className="my-4 w-full">
                                <label
                                  htmlFor="note-text"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Prompts
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm w-full">
                                  <Dropdown
                                    title="Prompts"
                                    type="prompts"
                                    items={prompts}
                                  />
                                </div>
                              </div>
                            </form>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
  );
};

export default memo(Modal);
