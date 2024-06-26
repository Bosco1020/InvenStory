import React from "react";

import ItemBox from "./ItemBox.jsx";
import ItemModel from "../utils/Item.model.js";

const ItemsTable = ({ allItems }) => {
  // Show n boxes
  const itemRows = allItems.map((currentItem) => {
    const item = new ItemModel(
      currentItem.item._id,
      currentItem.item.name,
      currentItem.item.description,
      currentItem.item.tagsList
    );
    let allTags = "";
    for (let i = 0; i < item.tagsList.length; i++) {
      allTags += item.tagsList[i] + ", ";
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
