import React from "react";
import { useState } from "react";

import ItemBox from "./ItemBox.jsx";
import ItemModel from "../utils/Item.model.js";

import { editItem } from "../service/admin.service.js";

import Modal from "./Modal.jsx";

const ItemsTable = ({ allItems, isAdmin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState({});

  const openModal = (target) => {
    setEditTarget(target);
    setIsModalOpen(true);
  };

  const closeModal = async (item) => {
    setIsModalOpen(false);
    // const tagList = tags.split(", ");
    if (item != null) {
      const res = await editItem(item);
      console.log(res);
      window.location.href = "/";
    } //if(res.name != "-not Found-")
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
    // allTags = item.tagsList; Object.keys(data.shareInfo[i]).length
    for (let i = 0; i < currentItem.tagList.length; i++) {
      allTags += currentItem.tagList[i] + ", ";
    }

    return (
      <div className="col-sm-12 col-md-6" key={item._id}>
        <ItemBox
          boxItem={item}
          tagList={allTags}
          key={item._id}
          admin={isAdmin}
          modal={openModal}
        />
      </div>
    );
  });

  return (
    <div>
      {isModalOpen && <Modal CloseModal={closeModal} item={editTarget} />}
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
