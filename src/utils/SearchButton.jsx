import React from "react";
import { useNavigate } from "react-router-dom";

function SearchButton({ searchValue, setSearchValue }) {
  const navigateTo = useNavigate();
  return (
    <div>
      <div className="join">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className="indicator">
          <button
            className="btn join-item"
            onClick={() => navigateTo(`/admin?vehicleName=${searchValue}`)}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchButton;
