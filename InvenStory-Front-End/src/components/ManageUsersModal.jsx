import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import RemoveUserBtn from "./RemoveUserBtn";

import UserModel from "../utils/user.model.js";

import { addItemToUser } from "../service/admin.service.js";

const ManageUsersModal = ({ CloseModal, Users, Item }) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addUser, setAddUser] = useState("");

  const handleSubmit = () => {
    // Send addUser to service to assign item
    addItemToUser(addUser, Item);
    CloseModal(true); // stay open = true
  };

  useEffect(() => {
    if (!loading) return;

    setUserList(Users); // <- Re-use list from Users component so no repeat call

    setLoading(false);
  }),
    [];

  const usersRows = userList.map((currentUser) => {
    const user = new UserModel(
      currentUser._id,
      currentUser.name,
      currentUser.password,
      currentUser.role,
      currentUser.assignedItems
    );
    return (
      <div className="item-users" key={"List" + user._id}>
        {`> ${user.name}`}
        {user.name !== "-none-" ? (
          <RemoveUserBtn user={user.name} item={Item} />
        ) : (
          <></>
        )}
      </div>
    );
  });

  return (
    <div
      className="modal show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Assign Users</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={(e) => {
                CloseModal(false);
              }}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row align-items-center">
              <div className="col-12">
                <form onSubmit={handleSubmit}>
                  <label className="container align-items-center">
                    <div className="row container users-box">
                      <span className="col-12 item-users bold">Users: </span>
                      <span className="user-list">{usersRows}</span>
                    </div>
                  </label>
                  <br />
                  <div className="d-flex justify-content-center">
                    <label className="container align-items-center">
                      <h6 className="modal-names">Add User </h6>
                      <input
                        type="text"
                        name="userInput"
                        className="userInput modalInput"
                        id="UserInput"
                        value={addUser}
                        placeholder="Input User Name"
                        onChange={(e) => {
                          setAddUser(e.target.value);
                        }}
                      />
                    </label>
                  </div>
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
                CloseModal(false);
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

export default ManageUsersModal;
