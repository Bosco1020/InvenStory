import React from "react";

const ItemDetails = ({ details, tags }) => {
  return (
    <>
      <div className="container">
        <p>{`${details.name}`}</p>
        <p>Tags: {`${tags}`}</p>
      </div>
    </>
  );
};

export default ItemDetails;
