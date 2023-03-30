import React, { useState } from "react";
import { AddPrompt } from ".";

export default function PromptModal({ openPromptModal, setOpenPromptModal, promptsToAdd, setPromptsToAdd }) {
  const [openAddPromptModal, setOpenAddPromptModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [isSelectedAny, setIsSelectedAny] = useState(false);

  const [prompts, setPrompts] = useState([
    {
      id: 1,
      promptName: "first",
      promptText: "what is your first choice",
    },
  ]);

  const handleSelectOption = (prompt) => {
    setIsSelectedAny(true);
    setSelectedOption(prompt);
  };

  const handleRemove = (id) => {
    setPrompts((prev) => {
      let newArr = [...prev];
      // remove this prompt element from newArr
      newArr.splice(prompts.findIndex(a => a.id === id), 1);
      return newArr;
    });
    setIsSelectedAny(false);
  };

  const handleCloseModal = () => {
    setIsSelectedAny(false);
    setOpenPromptModal(false);
  }

  const handleAdd = () => {
    setPromptsToAdd([...promptsToAdd, selectedOption]);
    setOpenPromptModal(false);
  }

  return (
    <>
      <input
        type="checkbox"
        id="my-modal-5"
        className="modal-toggle"
        checked={openPromptModal}
      />
      <div className="modal">
        <div className="modal-box w-[30%] max-w-5xl">
          <h3 className="font-bold text-lg">Clinical Note prompts</h3>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-80 w-[80%] overflow-auto p-2 bg-white text-left text-black">
              {prompts?.map((prompt, index) => (
                <p
                  key={index}
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
                onClick={() => setOpenAddPromptModal(true)}
              >
                New
              </button>
              <button className="btn btn-info" disabled={!isSelectedAny}>
                Edit
              </button>
              <button className="btn btn-info" disabled={!isSelectedAny} onClick={() => handleRemove(selectedOption?.id)}>
                Delete
              </button>
            </div>
          </div>
          <div className="modal-action">
            <button onClick={handleAdd} disabled={!isSelectedAny} className="btn btn-primary">Add</button>
            <button className="btn" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <AddPrompt
        openAddPromptModal={openAddPromptModal}
        setOpenAddPromptModal={setOpenAddPromptModal}
        prompts={prompts}
        setPrompts={setPrompts}
      />
    </>
  );
}
