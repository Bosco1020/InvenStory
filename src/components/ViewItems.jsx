import React from "react";

import FilterItems from "./FilterItems.jsx";
import ItemsTable from "./ItemsTable.jsx";
import ItemBox from "./ItemBox.jsx";

import dummyData from "../../data/dummyItems.json";

/* <FilterItems /> */

const ViewItems = () => {
  console.log(dummyData);
  return (
    <div>
      <br />
      <br />
      <ItemsTable allItems={dummyData.allItems} />
    </div>
  );
};

export default ViewItems;
