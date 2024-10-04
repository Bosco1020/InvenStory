import React from "react";
import { useEffect, useState } from "react";

import {
  editItem,
  addItem,
  deleteItem,
  deleteItemFromUsers,
  getAllUsers,
} from "../service/admin.service.js";

import UserModel from "../utils/user.model.js";

import RemoveUserBtn from "./RemoveUserBtn";
import ManageUsersModal from "./ManageUsersModal.jsx";

const Users = ({ item }) => {
  const [userList, setUserList] = useState([]);
  const [assignOpen, setAssignOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const closeAssign = async (stayOpen) => {
    setAssignOpen(false);
    window.location.href = "/";
    //await refresh();
    //if (stayOpen) openAssign();

    // const tagList = tags.split(", ");
    // if (item != null) {
    //   const res = await editItem(item);
    //   window.location.href = "/";
    // } //if(res.name != "-not Found-")
  };

  const refresh = async () => {
    window.location.href = "/";
  };

  const openAssign = () => {
    setAssignOpen(true);
  };

  useEffect(() => {
    if (!loading) return;
    // const buffer = ["-"];
    // setUserList(buffer);

    const getUsers = async () => {
      const allUsers = await getAllUsers(item.name);
      setUserList(allUsers);
      //   // split by ,
      //   let list = tags.split(", ");
      //   if (list.length > 0) list = list.slice(0, list.length - 1);
      //   else list = "";

      //   if (list[list.length - 1] == "") list = list.slice(0, list.length - 1);

      //   setTagsArray(list);
      setLoading(false);
    };

    if (loading) getUsers();
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
          <RemoveUserBtn user={user.name} item={item.name} />
        ) : (
          <></>
        )}
      </div>
    );
  });
  // On Click, call update on user, removing selected assigned item

  return (
    <>
      {!loading ? (
        <>
          {assignOpen && (
            <ManageUsersModal
              CloseModal={closeAssign}
              Users={userList}
              Item={item.name}
            />
          )}
          <div className="row container users-box">
            <span className="col-12 item-users bold">Users: </span>
            <span className="user-list">{usersRows}</span>
          </div>
          <div className="container-fluid text-center">
            <button
              type="button"
              className="btn user-btn"
              onClick={(e) => {
                openAssign();
              }}
            >
              Assign
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Users;
