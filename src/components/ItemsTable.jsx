import React from "react";

import ItemBox from "./ItemBox.jsx";
import ItemModel from "../utils/Item.model.js";

const ItemsTable = ({ allItems }) => {
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
        <ItemBox boxItem={item} tagList={allTags} key={item._id} />
      </div>
    );
  });

  return (
    <div className="container-fluid">
      <div className="row align-items-start">
        <br />
        <>{itemRows}</>
      </div>
    </div>
  );
};

export default ItemsTable;
