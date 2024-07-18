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

import { PixelSpinner } from "react-epic-spinners"; //https://github.com/bondz/react-epic-spinners

const ViewItems = () => {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [shownItems, setShownItems] = useState([]);

  const [addOpen, setAddOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const user = JSON.parse(localStorage.getItem(`user`));

  useEffect(() => {
    const getItems = async () => {
      // depending on user role, call different get:
      let res;
      if (localStorage.getItem(`user`)) {
        if (user.role == 1) {
          res = await getUsersItemsData(user);
          setAdmin(false);
        } else {
          res = await getAllItemsData();
          setAdmin(true);
        }
      } else window.location.href = "/Login";
      if (res.message == "Request failed with status code 500") return;
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
      <br />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <PixelSpinner color="#d4b200" size="300"></PixelSpinner>
        </div>
      ) : (
        <>
          <br />
          <FilterItems setOpen={setAddOpen} isAdmin={admin} />
          <br />
          <ItemsTable
            allItems={shownItems}
            isAdmin={admin}
            open={addOpen}
            setOpen={setAddOpen}
          />
        </>
      )}
      <br />
      <br />
    </div>
  );
};

export default ViewItems;
