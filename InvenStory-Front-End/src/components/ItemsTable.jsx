import React from "react";
import { useState } from "react";

import ItemBox from "./ItemBox.jsx";
import ItemModel from "../utils/Item.model.js";

import {
  editItem,
  addItem,
  deleteItem,
  deleteItemFromUsers,
} from "../service/admin.service.js";

import Modal from "./Modal.jsx";

const ItemsTable = ({ allItems, isAdmin, open, setOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState({});

  const openEdit = (target) => {
    setEditTarget(target);
    setEditOpen(true);
  };

  const closeEdit = async (item) => {
    setEditOpen(false);
    if (item != null) {
      const res = await editItem(item);
      window.location.href = "/";
    }
  };

  const closeAdd = async (item) => {
    setOpen(false);
    if (item != null) {
      const res = await addItem(item);
      window.location.href = "/";
    }
  };

  const deleteItemButton = (item) => {
    deleteItem(item._id);
    deleteItemFromUsers(item.name);
    window.location.href = "/";
  };

  // Show n boxes
  const itemRows = allItems.map((currentItem) => {
    const item = new ItemModel(
      currentItem._id,
      currentItem.name,
      currentItem.description,
      currentItem.tagList
    );
    let allTags = "";
    for (let i = 0; i < currentItem.tagList.length; i++) {
      allTags += currentItem.tagList[i] + ", ";
    }

    return (
      <div
        className="col-sm-12 col-md-12 col-lg-6"
        key={item._id}
        align="center"
      >
        <ItemBox
          boxItem={item}
          tagList={allTags}
          key={item._id}
          admin={isAdmin}
          modal={openEdit}
          DeleteItem={deleteItemButton}
          data-testid="Test Item"
        />
      </div>
    );
  });

  return (
    <div>
      {editOpen && (
        <Modal CloseModal={closeEdit} item={editTarget} isNew={false} />
      )}
      {open && <Modal CloseModal={closeAdd} item={editTarget} isNew={true} />}
      <div className="container-fluid">
        <div className="row align-items-start">
          <br />
          <>{itemRows}</>
        </div>
      </div>
    </div>
  );
};

export default ItemsTable;
