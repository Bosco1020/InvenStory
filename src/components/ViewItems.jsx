import React from "react";
import { useEffect, useState } from "react";

import { getItemsData } from "../service/items.service.js";
import FilterItems from "./FilterItems.jsx";
import ItemsTable from "./ItemsTable.jsx";

//import dummyData from "../../data/dummyItems.json";

const ViewItems = () => {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", tag: "" });
  const [allItems, setAllItems] = useState([]);

  const filterItems = () => {
    // Apply filter to items shown
  };

  useEffect(() => {
    const getItems = async () => {
      const res = await getItemsData();
      console.log(res);
      setAllItems(res);
      setLoading(false);
    };

    if (!loading) return;
    getItems();
    // Check if filters applied
    if (filters.name == "" || filters.tag == "") return;
    filterItems();
  }),
    [];

  return (
    <div>
      <br />
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <br />
          <FilterItems Filters={setFilters} />
          <br />
          <ItemsTable allItems={allItems} />
        </>
      )}
    </div>
  );
};

export default ViewItems;
