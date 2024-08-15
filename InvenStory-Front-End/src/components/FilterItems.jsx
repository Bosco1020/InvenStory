import React from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./CSS/FilterBox.css";

const FilterItems = ({ setOpen, isAdmin }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [nameFilter, setNameFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const [searchParams, setSearchParams] = useSearchParams("");

  const handleFilter = () => {
    // Filters([nameFilter, tagFilter]);
    // Filters({ name: nameFilter, tag: tagFilter });
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
    window.location.href = "/";
  };

  useEffect(() => {
    if (!loading) return;

    if (
      searchParams.get("nameFilter") != "" ||
      searchParams.get("tagFilter") != ""
    ) {
      setNameFilter(searchParams.get("nameFilter"));
      setTagFilter(searchParams.get("tagFilter"));
    }

    setLoading(false);
  }),
    [];

  return (
    <div className="row">
      <div className="col-10">
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
                  <button
                    type="submit"
                    className="btn filter-btn filter-spacer"
                  >
                    Filter
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
          <div className="container text-start">
            <button
              type="button"
              className="btn filter-btn"
              variant="primary"
              onClick={openFilter}
            >
              Filter
            </button>
          </div>
        )}
      </div>
      <div className="col-md-2 col-sm-1">
        {isAdmin ? (
          <div className="container text-end">
            <button
              type="button"
              className="btn btn-primary add-btn"
              variant="primary"
              size="lg"
              onClick={(e) => {
                setOpen(true);
              }}
            >
              Add Item
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FilterItems;
