import React from "react";

const ItemDetails = ({ details, tags }) => {
  return (
    <>
      <div className="container item-detail-box">
        <span className="item-name">{`${details.name}`}</span> <br />
      </div>
    </>
  );
};

export default ItemDetails;
