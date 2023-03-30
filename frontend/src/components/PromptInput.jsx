import React, { useState } from "react";

function PromptInput({ text, prompts, onTextChange, onPromptAdd, onPromptDelete }) {
  const [promptValue, setPromptValue] = useState("");

  const handleTextChange = (event) => {
    onTextChange(event.target.value);
  };

  const handlePromptValueChange = (event) => {
    setPromptValue(event.target.value);
  };

  const handlePromptAdd = () => {
    if (promptValue) {
      onPromptAdd(promptValue);
      setPromptValue("");
    }
  };

  const handlePromptDelete = (index) => {
    onPromptDelete(index);
  };

  const renderPrompt = (prompt, index) => {
    const promptRegex = new RegExp(`{{${prompt.name}}}`);
    const parts = text.split(promptRegex);
    return (
    //   <div key={index}>
    //     <span className="text-gray-500">{prompt.name}: </span>
    //     <input
    //       type={prompt.type}
    //       value={prompts[index].value}
    //       onChange={(event) => {
    //         const newPrompts = [...prompts];
    //         newPrompts[index].value = event.target.value;
    //         onPromptAdd(newPrompts);
    //       }}
    //       className="inline-block w-32"
    //     />
    //     <button onClick={() => handlePromptDelete(index)}>Delete</button>
    //   </div>
    <div key={index}>
        <span className="text-gray-500">{prompt.name}: </span>
        <input
          type={prompt.type}
          value={prompts[index].value}
          onChange={(event) => {
            const newPrompts = [...prompts];
            newPrompts[index].value = event.target.value;
            onPromptAdd(newPrompts);
          }}
          className="inline-block w-32"
        />
        <button onClick={() => handlePromptDelete(index)}>Delete</button>
        <br />
        {parts.map((part, i) => {
          return (
            <React.Fragment key={i}>
              {part}
              {i !== parts.length - 1 && (
                <span className="text-gray-500 bg-gray-100 p-1 rounded">{prompt.name}</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <textarea value={text} onChange={handleTextChange} />
      <div>
        <input type="text" value={promptValue} onChange={handlePromptValueChange} />
        <button onClick={handlePromptAdd}>Add Prompt</button>
      </div>
      {prompts.map(renderPrompt)}
    </div>
  );
}

export default PromptInput;
