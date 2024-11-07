import React from "react";
import { useEffect, useState } from "react";

import ItemDetails from "./ItemDetails.jsx";
import ItemTags from "./ItemTags.jsx";
import Users from "./Users.jsx";

import "./CSS/ItemBox.css";

const ItemBox = ({ boxItem, tagList, admin, modal, DeleteItem }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const getUsers = async () => {
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
            <div className="col-12">
              {admin ? ( // If Admin, shrink item name & tag for room for user details
                <div className="row">
                  <div className="col-3 ticket-start">
                    <Users item={boxItem} />
                  </div>
                  <div className="col-9 ticket-end">
                    <div className="row">
                      <div className="col-8 ticket-centre">
                        <ItemDetails
                          details={boxItem}
                          tags={tagList}
                          isAdmin={admin}
                        />
                        <div className="container text-left description item-box">
                          <textarea
                            readOnly={true}
                            className="form-control"
                            rows="3"
                            id="tagInput"
                            value={`${boxItem.description}`}
                          />
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
                </div>
              ) : (
                //Not an admin, so render item at full size
                <div className="row ticket-end user-ticket">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-8 ticket-centre">
                        <ItemDetails
                          details={boxItem}
                          tags={tagList}
                          isAdmin={admin}
                        />
                        <div className="container text-left description item-box">
                          <textarea
                            readonly="true"
                            className="form-control"
                            rows="3"
                            id="tagInput"
                            value={`${boxItem.description}`}
                          />
                        </div>
                        <br />
                      </div>
                      <div className="col-3">
                        <ItemTags tags={tagList} />
                      </div>
                      <div className="col-1"> </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItemBox;
