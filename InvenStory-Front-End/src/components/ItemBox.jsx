import React from "react";
import { useEffect, useState } from "react";

import ItemDetails from "./ItemDetails.jsx";
import ItemTags from "./ItemTags.jsx";

import { getAllUsers } from "../service/admin.service.js";

import "./CSS/ItemBox.css";

const ItemBox = ({ boxItem, tagList, admin, modal, DeleteItem }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const getUsers = async () => {
      // const allUsers = await getAllUsers(boxItem.name);
      // //   console.log(allUsers);
      // setUsers(allUsers);
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
            {admin ? ( // If Admin, shrink item name & tag for room for user details
              <>
                <div className="col-3 ticket-start">
                  {/* <ItemUsers details={boxItem} allUsers={users} /> */}
                </div>
                <div className="col-9 ticket-end">
                  <div className="row">
                    {/* partition end ticket into description and tags */}
                    <div className="col-8 ticket-centre">
                      <ItemDetails
                        details={boxItem}
                        tags={tagList}
                        isAdmin={admin}
                      />
                      <div className="container text-left description item-box">
                        <p>{`${boxItem.description}`}</p>
                      </div>

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
                                DeleteItem(boxItem);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <br />
                    </div>
                    <div className="col-3">
                      <ItemTags tags={tagList} />
                    </div>
                    <div className="col-1"></div>
                  </div>
                </div>
              </>
            ) : (
              //Not an admin, so render item at full size
              <div className="col-12">
                <ItemDetails details={boxItem} tags={tagList} isAdmin={admin} />
              </div>
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
