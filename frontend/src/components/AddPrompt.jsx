import React, { useState } from "react";
import uuid from "react-uuid";

export default function AddPrompt({
  openAddPromptModal,
  setOpenAddPromptModal,
  prompts,
  setPrompts,
}) {
  const [formData, setFormData] = useState({
    promptName: "",
    promptText: "",
    responseType: "",
    defaultValue: "",
  });
  const [radioOptions, setRadioOptions] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setPrompts([...prompts, { ...formData, id: uuid() }]);

    // clearing the fields
    setFormData({
      promptName: "",
      promptText: "",
      responseType: "",
      defaultValue: "",
    });

    // close the modal
    setOpenAddPromptModal(false);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (currentKeyword.trim()) {
        setRadioOptions([...radioOptions, currentKeyword.trim()]);
      }
      setCurrentKeyword("");
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="my-modal-5"
        className="modal-toggle"
        checked={openAddPromptModal}
      />
      <div className="modal">
        <div className="modal-box w-[28%] max-w-5xl">
          <h3 className="font-bold text-lg">New Prompt</h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-start space-y-4 mt-6">
              <input
                required
                type="text"
                name="promptName"
                placeholder="Prompt name"
                value={formData.promptName}
                onChange={handleChange}
                className="input input-bordered input-accent w-full max-w-xs"
              />
              <input
                required
                type="text"
                name="promptText"
                placeholder="Prompt text"
                value={formData.promptText}
                onChange={handleChange}
                className="input input-bordered input-accent w-full max-w-xs"
              />
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Response Type</span>
                </label>
                <select
                  name="responseType"
                  className="select select-bordered w-full max-w-xs"
                  value={formData.responseType}
                  onChange={handleChange}
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option value="checkbox">Confirm Only</option>
                  <option value="number">Number / Amount</option>
                  <option value="text">Text</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="date">Date</option>
                  <option value="radio">One Response from List</option>
                </select>
              </div>

              <div>
                {formData.responseType === "radio" ? (
                  <>
                    <h2>
                      Enter the list of possible responses ( one per line )
                    </h2>

                    <div className="bg-white w-full h-36 mt-1 overflow-y-auto p-2 flex flex-col space-y-2 text-black text-left">
                      {radioOptions?.map((option, index) => (
                        <p key={index}>{option}</p>
                      ))}

                      <input
                        type="text"
                        onChange={(e) => setCurrentKeyword(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        className="bg-transparent w-full border-none outline-none"
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
              <button
                className="btn"
                onClick={() => setOpenAddPromptModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
