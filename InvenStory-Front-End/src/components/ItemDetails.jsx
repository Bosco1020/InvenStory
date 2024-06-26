import React from "react";

const ItemDetails = ({ details, tags }) => {
  return (
    <div className="container">
      <br />
      <p>{`${details.name}`}</p>
      <p>Tags: {`${tags}`}</p>
      <p>{`${details.description}`}</p>
    </div>
  );
};

export default ItemDetails;
