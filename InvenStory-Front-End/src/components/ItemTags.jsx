import React from "react";
import { useEffect, useState } from "react";

const ItemTags = ({ tags }) => {
  const [Array, setTagsArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const splitTags = () => {
      // split by ,
      let list = tags.split(", ");
      if (list.length > 0) list = list.slice(0, list.length - 1);
      else list = "";

      if (list[list.length - 1] == "") list = list.slice(0, list.length - 1);

      setTagsArray(list);
      setLoading(false);
    };

    if (loading) splitTags();
  }),
    [];

  const tagRows = Array.map((currentTag) => {
    return <div className="item-tags"> {`> ${currentTag}`},</div>;
  });

  return (
    <div>
      {!loading ? (
        <>
          <div className="container tags-box">
            <span className="item-tags bold">Tags: </span>
            <span>{tagRows}</span>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ItemTags;
