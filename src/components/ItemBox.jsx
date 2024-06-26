import React from "react";

import ItemDetails from "./ItemDetails.jsx";
import ItemUsers from "./ItemUsers.jsx";

const ItemBox = ({ boxItem, tagList }) => {
  // If Admin, split to 2 columns to contain components, may need to pass prop in to format children

  return (
    <div>
      <ItemDetails details={boxItem} tags={tagList} />
    </div>
  );
};

export default ItemBox;
