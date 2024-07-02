import React from "react";
import { useEffect, useState } from "react";

import { getAllUsers } from "../service/admin.service.js";

const ItemUsers = ({ details, allUsers }) => {
  const [loading, setLoading] = useState(false);
  // Get name, call function with name, for each user in res print <>

  const users = allUsers.map((user) => {
    <li>{`${user.name}`}</li>;
  });

  //   useEffect(() => {
  //     if (!loading) return;
  //     users = allUsers.map((user) => {
  //       <li>{`${user.name}`}</li>;
  //     });
  //     console.log(users);
  //     if (users != undefined) setLoading(false);
  //   }),
  //     [];

  return (
    <div className="row">
      {!loading ? (
        <></>
      ) : (
        <>
          <div className="col-3 mx-auto p-1 mainBox">
            <p>Users:</p>
          </div>
          <div className="col-5 mx-auto p-1 mainBox">
            <ul>{users}</ul>
          </div>
          <div className="col-4 mx-auto p-1 mainBox">
            <p>Buttons</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemUsers;
