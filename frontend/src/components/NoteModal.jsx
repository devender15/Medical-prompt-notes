import React from "react";

export default function NoteModal({ open, setOpen, template }) {

    const handleClose = () => {
        setOpen(false);
    }

  return (
    <>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" checked={open} />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">
            Note template
          </h3>
          <div>
            <h2>{template?.promptText}</h2>
            <div className="mt-4">

            </div>
          </div>
          <div className="modal-action">
            <button className="btn btn-primary">Okay</button>
            <button className="btn" onClick={handleClose}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
