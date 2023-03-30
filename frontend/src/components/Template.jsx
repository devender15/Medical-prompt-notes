import React, { useState } from "react";
import { PromptModal } from ".";
import client from "../utils/client";

export default function Template({ openTemplateModal, setOpenTemplateModal }) {
  const [openPromptModal, setOpenPromptModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [isSelectedAny, setIsSelectedAny] = useState(false);
  const [promptsToAdd, setPromptsToAdd] = useState([]);
  const [templateForm, setTemplateForm] = useState({
    title: "",
    bodyText: [],
  });

  const [textArray, setTextArray] = useState([""]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setTemplateForm({ ...templateForm, [name]: value });
  };

  const handleSelectOption = (prompt) => {
    setIsSelectedAny(true);
    setSelectedOption(prompt);
  };

  const handleRemove = (id) => {
    setPromptsToAdd((prev) => {
      let newArr = [...prev];
      // remove this prompt element from newArr
      newArr.splice(
        promptsToAdd.findIndex((a) => a.id === id),
        1
      );
      return newArr;
    });
    setIsSelectedAny(false);
  };

  const handleAddPromptToText = (prompt) => {
    setTextArray([...textArray, prompt]);
    console.log(textArray);
  }

  const renderTextArray = () => {
    return textArray.map((text, index) => {
      if (typeof text === "object" && text !== null && "promptName" in text) {
        return " ~ " + text.promptName + " ~ ";
      } else {
        return text;
      }
    }).join("\n");
  };

  const handleTextareaChange = (event) => {
    const newText = event.target.value;
    const newTextArray = newText.split("\n");
    // setTextArray([...textArray, newText]);
    setTextArray(newTextArray);
  };


  const handleCreateTemplate = async () => {
    const resp = await client.create({
      _type: "templates",
      name: templateForm.title,
      bodyText: textArray,
    });

    setOpenTemplateModal(false);
  };

  return (
    <>
      <input
        type="checkbox"
        id="my-modal-5"
        className="modal-toggle"
        checked={openTemplateModal}
      />
      <div className="modal">
        <div className="modal-box w-full max-w-5xl">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Template title"
              value={templateForm.title}
              onChange={handleChange}
              className="input input-bordered input-accent w-full max-w-xs"
            />
          </div>
          <div className="flex items-start justify-center gap-8 w-full my-6">
            <div className="basis-1/2 space-y-2">
              <h2>Clinical Note text</h2>
              <textarea
                className="textarea textarea-accent text-lg w-full h-[20rem] overscroll-y-auto bg-white text-black font-bold resize-none"
                value={renderTextArray()}
                onChange={handleTextareaChange}
                placeholder="Add text here"
              ></textarea>
            </div>

            <div className="basis-1/2 space-y-2">
              <h2>Clinical Note Prompts</h2>
              <div className="flex items-center justify-between w-full text-black">
                <div className="bg-white h-[18rem] w-80 p-2 rounded-xl overscroll-auto text-left">
                  {promptsToAdd?.map((prompt) => (
                    <p
                      key={prompt.id}
                      onClick={() => handleSelectOption(prompt)}
                      className="cursor-pointer px-2 hover:bg-gray-300 active:bg-blue-700"
                    >
                      {prompt.promptName}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    className="btn btn-info"
                    onClick={() => setOpenPromptModal(true)}
                  >
                    Select / Setup
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={() => handleRemove(selectedOption.id)}
                    disabled={!isSelectedAny}
                  >
                    Remove
                  </button>
                  <button className="btn btn-info" disabled={!isSelectedAny}>
                    Move up
                  </button>
                  <button className="btn btn-info" disabled={!isSelectedAny}>
                    Move down
                  </button>
                </div>
              </div>
              <div className="w-full flex justify-start">
                <button className="btn btn-success" onClick={() => handleAddPromptToText(selectedOption)} disabled={!isSelectedAny}>
                  Insert Prompt in text
                </button>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <label onClick={handleCreateTemplate} htmlFor="my-modal-5" className="btn btn-primary">
              Okay
            </label>
            <label
              htmlFor="my-modal-5"
              className="btn"
              onClick={() => setOpenTemplateModal(false)}
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
      <PromptModal
        openPromptModal={openPromptModal}
        setOpenPromptModal={setOpenPromptModal}
        promptsToAdd={promptsToAdd}
        setPromptsToAdd={setPromptsToAdd}
      />
    </>
  );
}
