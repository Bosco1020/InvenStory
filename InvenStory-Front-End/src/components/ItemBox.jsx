import React from "react";

import ItemDetails from "./ItemDetails.jsx";
import ItemUsers from "./ItemUsers.jsx";

const ItemBox = ({ item }) => {
  // If Admin, split to 2 columns to contain components, may need to pass prop in to format children

  return (
    <div>
      <ItemDetails details={item} />
    </div>
  );
};

export default ItemBox;
