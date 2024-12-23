import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./CSS/Modal.css";

// isNew defines whether we're adding a new item of editing an existing one
const Modal = ({ CloseModal, item, isNew }) => {
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    item.name = name;
    item.description = description;
    item.tagList = tags.split(", ");
    CloseModal(item);
  };

  useEffect(() => {
    if (!loading) return;
    setName("");
    setDescription("");
    let allTags = "";
    if (!isNew) {
      setName(item.name);
      setDescription(item.description);
      for (let i = 0; i < item.tagList.length; i++) {
        allTags += item.tagList[i];
        if (i != item.tagList.length - 1) allTags += ", ";
      }
    }
    setTags(allTags);

    setLoading(false);
  }),
    [];

  return (
    <div
      className="modal show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {isNew ? (
              <h5 className="modal-title">New Item</h5>
            ) : (
              <h5 className="modal-title">Edit: {`${item.name}`}</h5>
            )}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={(e) => {
                CloseModal(null);
              }}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row align-items-center">
              <div className="col-12">
                <form onSubmit={handleSubmit}>
                  <label className="container align-items-center">
                    <h6 className="modal-names">Item Name </h6>
                    <input
                      type="text"
                      name="nameInput"
                      className="itemName modalInput"
                      id="NameInput"
                      value={name}
                      placeholder="Item Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </label>
                  <br />
                  <label className="container align-items-center">
                    <h6 className="modal-names">Tags </h6>
                    <textarea
                      className="form-control"
                      rows="1"
                      id="tagInput"
                      value={tags}
                      placeholder="Add Tags Here: Separate, Each, With, A, Comma"
                      onChange={(e) => {
                        setTags(e.target.value);
                      }}
                    />
                  </label>
                  <br />
                  <label className="container align-items-center">
                    <h6 className="modal-names">Item Description </h6>
                    <textarea
                      className="form-control"
                      rows="3"
                      id="descInput"
                      value={description}
                      placeholder="Add a description"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </label>
                  <br />
                  <br />
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn submit-btn">
                      Submit
                    </button>
                  </div>
                  <br />
                </form>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => {
                CloseModal(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
