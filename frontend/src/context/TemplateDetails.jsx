import React, { createContext, useState } from "react";

export const TemplateDetailsContext = createContext();

const TemplateDetails = (props) => {
  const [templateDetails, setTemplateDetails] = useState({
    title: "",
    text: "",
    prompts: [],
  });

  return (
    <TemplateDetailsContext.Provider value={{templateDetails, setTemplateDetails}}>
      {props.children}
    </TemplateDetailsContext.Provider>
  );
};

export default TemplateDetails;
