import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getAllItemsData,
  getUsersItemsData,
} from "../service/items.service.js";
import { filterByTag } from "../utils/item-filter.js";
import FilterItems from "./FilterItems.jsx";
import ItemsTable from "./ItemsTable.jsx";

//import dummyData from "../../data/dummyItems.json";

const ViewItems = () => {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [shownItems, setShownItems] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const user = JSON.parse(localStorage.getItem(`user`));

  //? DO need check incase open / while not logged in? Sorted in App?

  useEffect(() => {
    const getItems = async () => {
      // depending on user role, call different get:
      let res;
      if (user.role == 1) {
        res = await getUsersItemsData(user);
        setAdmin(false);
      } else {
        res = await getAllItemsData();
        setAdmin(true);
      }
      console.log(res);
      setAllItems(res);

      // Check if filters applied
      if (
        searchParams.get("nameFilter") == null &&
        searchParams.get("tagFilter") == null
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
          <ItemsTable allItems={shownItems} isAdmin={admin} />
        </>
      )}
    </div>
  );
};

export default ViewItems;