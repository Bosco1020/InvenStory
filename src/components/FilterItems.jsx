import React from "react";
import { useEffect, useState } from "react";

import "./CSS/FilterBox.css";

const FilterItems = ({ Filters }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const handleFilter = () => {
    Filters({ name: nameFilter, tag: tagFilter });
    //window.location.href = "/"; // Reload view page after setting filters
  };

  const closeFilter = async (e) => {
    // e.handleDefault();
    setFilterOpen(false);
  };

  const openFilter = async (e) => {
    //e.handleDefault();
    setFilterOpen(true);
  };

  const clearFilter = () => {
    setNameFilter("");
    setTagFilter("");
    Filters({ name: "", tag: "" });
  };

  return (
    <div>
      {filterOpen ? (
        <div className="row">
          <div className="col-sm-12 col-lg-6">
            <div className="container filter-box">
              <form onSubmit={handleFilter}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="nameFilter"
                    className="nameFilter filter-spacer"
                    id="nameFilter"
                    value={nameFilter}
                    placeholder="Search by Name"
                    onChange={(e) => {
                      setNameFilter(e.target.value);
                    }}
                  />
                </label>
                <label>
                  Tag:
                  <input
                    type="text"
                    name="tagFilter"
                    className="tagFilter filter-spacer"
                    id="tagFilter"
                    value={tagFilter}
                    placeholder="Search by Tag"
                    onChange={(e) => {
                      setTagFilter(e.target.value);
                    }}
                  />
                </label>
                <button type="submit" className="btn btn-primary filter-spacer">
                  FIlter
                </button>
              </form>
              <button
                type="button"
                className="btn btn-secondary filter-spacer"
                variant="secondary"
                size="sm"
                onClick={closeFilter}
              >
                Close Filter
              </button>
              <button
                type="button"
                className="btn btn-secondary filter-spacer"
                variant="secondary"
                size="sm"
                onClick={clearFilter}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <button
            type="button"
            className="btn btn-primary"
            variant="primary"
            size="lg"
            onClick={openFilter}
          >
            Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterItems;
