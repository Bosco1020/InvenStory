import React from "react";

const ItemDetails = ({ details, tags }) => {
  return (
    <div className="container">
      <p>{`${details.name}`}</p>
      <p>Tags: {`${tags}`}</p>
      <div className="container text-center description">
        <p>{`${details.description}`}</p>
      </div>
    </div>
  );
};

export default ItemDetails;
