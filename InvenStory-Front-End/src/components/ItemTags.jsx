import React from "react";

const ItemTags = ({ tags }) => {
  return (
    <>
      <div className="container item-detail-box">
        <div className="tags-box">
          <span className="item-tags bold">Tags: </span>
          <span className="item-tags">{`${tags}`}</span>
        </div>
      </div>
    </>
  );
};

export default ItemTags;
