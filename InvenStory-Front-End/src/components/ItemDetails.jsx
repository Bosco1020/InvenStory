import React from "react";

const ItemDetails = ({ details, tags }) => {
  return (
    <>
      <div className="container">
        <p className="item-name">{`${details.name}`}</p>
        <p className="item-tags">Tags: {`${tags}`}</p>
      </div>
    </>
  );
};

export default ItemDetails;
