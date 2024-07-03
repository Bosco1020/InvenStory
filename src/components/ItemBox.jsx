import React from "react";
import { useEffect, useState } from "react";

import ItemDetails from "./ItemDetails.jsx";
import ItemUsers from "./ItemUsers.jsx";

import { getAllUsers } from "../service/admin.service.js";

import "./CSS/ItemBox.css";

const ItemBox = ({ boxItem, tagList, admin, modal }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //   const deleteItem = () => {
  //     modal();
  //   };

  //   const editItem = () => {
  //     modal();
  //   };

  useEffect(() => {
    if (!loading) return;
    const getUsers = async () => {
      const allUsers = await getAllUsers(boxItem.name);
      //   console.log(allUsers);
      setUsers(allUsers);
      setLoading(false);
    };

    if (loading) getUsers();
  }),
    [];

  return (
    <div className="item-box">
      {!loading ? (
        <>
          <div className="row">
            {admin ? (
              <>
                <div className="col-6">
                  <ItemDetails
                    details={boxItem}
                    tags={tagList}
                    isAdmin={admin}
                  />
                </div>
                <div className="col-6">
                  <ItemUsers details={boxItem} allUsers={users} />
                </div>
              </>
            ) : (
              <div className="col-12"> </div>
            )}
            <div className="row">
              <div className="col-1"></div>
              <div className="col-10">
                <div className="container text-left description item-box">
                  <p>{`${boxItem.description}`}</p>
                </div>
                <div className="col-1"></div>
              </div>
            </div>
            {admin ? (
              <div className="row">
                <div className="col-6">
                  <div className="container text-start">
                    <button
                      type="button"
                      className="btn item-btn"
                      onClick={(e) => {
                        modal(boxItem);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <div className="container text-end">
                    <button
                      type="button"
                      className="btn item-btn"
                      onClick={(e) => {
                        modal(boxItem);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
//       <ItemDetails details={boxItem} tags={tagList} isAdmin={admin} />

// <ItemUsers details={boxItem} />
export default ItemBox;
