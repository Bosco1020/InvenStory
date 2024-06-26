import React from "react";

import FilterItems from "./FilterItems.jsx";
import ItemsTable from "./ItemsTable.jsx";
import ItemBox from "./ItemBox.jsx";

import dummyData from "../../data/dummyItems.json";

const ViewItems = () => {
  return (
    <div>
      <FilterItems />
      <br />
      <ItemsTable allItems={dummyData.allItems} />
    </div>
  );
};

export default ViewItems;
