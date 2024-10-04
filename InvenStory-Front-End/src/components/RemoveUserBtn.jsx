import React from "react";

import { removeUserFromItem } from "../service/admin.service.js";

const RemoveUserBtn = ({ user, item }) => {
  return (
    <button
      type="button"
      className="btn remove-user-btn"
      onClick={(e) => {
        removeUserFromItem(user, item);
        window.location.href = "/";
      }}
    >
      X
    </button>
  );
};

export default RemoveUserBtn;
