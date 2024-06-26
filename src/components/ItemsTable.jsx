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

    return (
      <div className="col-sm-12 col-md-6" key={item._id}>
        <ItemBox item={item} key={item._id} />
      </div>
    );
  });

  return (
    <div className="container-fluid">
      <div className="row align-items-start">
        <>{itemRows}</>
      </div>
    </div>
  );
};

export default ItemsTable;
