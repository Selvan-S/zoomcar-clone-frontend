import React from "react";
import { useNavigate } from "react-router-dom";
import useVehicleFilter from "../hooks/useVehicleFilter";

const VehicleFilter = () => {
  const navigate = useNavigate();
  const { filters, updateFilter } = useVehicleFilter();
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    updateFilter(name, value);
  };

  const applyFilters = () => {
    navigate(
      `/search?carType=${filters.category}&gte=${filters.minPrice}&lte=${filters.maxPrice}`
    );
  };

  return (
    <div className="vehicle-filter flex gap-4 w-full items-end max-md:flex-col max-md:items-center">
      <label className="form-control max-w-xs md:w-1/3 w-full">
        <div className="label">
          <span className="label-text" onChange={handleFilterChange}>
            Choose a car type:
          </span>
        </div>
        <select
          className="select select-bordered"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value={""} disabled hidden>
            Pick one
          </option>
          <option value={"Hatchback"}>Hatchback</option>
          <option value={"Sedan"}>Sedan</option>
          <option value={"SUV"}>SUV</option>
        </select>
      </label>
      <div className="flex flex-row md:gap-4 gap-2 md:w-1/2">
        <label className="form-control items-center md:w-full">
          Min Price:
          <input
            type="number"
            className="input input-bordered w-full max-w-xs"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </label>
        <label className="form-control items-center md:w-full">
          Max Price:
          <input
            type="number"
            className="input input-bordered w-full max-w-xs"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <button
        onClick={() => applyFilters()}
        className="btn btn-primary md:w-1/4 max-w-xs w-full"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default VehicleFilter;
