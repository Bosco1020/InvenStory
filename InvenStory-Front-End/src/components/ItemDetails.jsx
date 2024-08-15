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

{
  /* <div className="tags-box">
  <span className="item-tags bold">Tags: </span>
  <span className="item-tags">{`${tags}`}</span>
</div>; */
}

export default ItemDetails;
