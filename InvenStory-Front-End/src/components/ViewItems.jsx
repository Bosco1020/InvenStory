import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getItemsData } from "../service/items.service.js";
import { filterByTag } from "../utils/item-filter.js";
import FilterItems from "./FilterItems.jsx";
import ItemsTable from "./ItemsTable.jsx";

//import dummyData from "../../data/dummyItems.json";

const ViewItems = () => {
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [shownItems, setShownItems] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getItems = async () => {
      const res = await getItemsData();
      console.log(res);
      setAllItems(res);

      // Check if filters applied
      if (
        searchParams.get("nameFilter") == "" &&
        searchParams.get("tagFilter") == ""
      )
        setShownItems(res);
      else {
        const filtered = filterByTag(
          {
            name: searchParams.get("nameFilter"),
            tag: searchParams.get("tagFilter"),
          },
          res
        );
        setShownItems(filtered);
        console.log("Filter Results:");
        console.log(filtered);
      }

      setLoading(false);
    };

    if (loading) getItems();
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
          <FilterItems />
          <br />
          <ItemsTable allItems={shownItems} />
        </>
      )}
    </div>
  );
};

export default ViewItems;
