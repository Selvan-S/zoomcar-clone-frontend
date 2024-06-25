import React, { useContext, useState } from "react";
import useVehicleFilter from "../hooks/useVehicleFilter";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const VehicleListFilter = () => {
  const navigate = useNavigate();
  const [carTypeChoice, setCarTypeChoice] = useState([]);
  const { filters, updateFilter } = useVehicleFilter();

  const animatedComponents = makeAnimated();
  const categoryOptions = [
    { value: "Hatchback", label: "Hatchback" },
    { value: "Sedan", label: "Sedan" },
    { value: "SUV", label: "SUV" },
  ];
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#1d232a",
    }),
    option: (styles) => {
      return {
        ...styles,
        color: "black",
      };
    },
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    updateFilter(name, value);
  };
  function getNameValueFromChoice() {
    if (carTypeChoice.length) {
      const choice = {};
      for (const carType of carTypeChoice) {
        if (!choice["category"]) {
          choice["category"] = [carType.value];
        } else choice["category"].push(carType.value);
      }
      updateFilter("category", choice["category"].join(","));
    } else {
      updateFilter("category", "");
    }
  }
  const applyFilters = () => {
    getNameValueFromChoice();
    navigate(
      `/search?carType=${filters.category}&gte=${filters.minPrice}&lte=${filters.maxPrice}`
    );
  };

  return (
    <div className="flex gap-4 w-full flex-col items-center">
      <label className="form-control max-w-xs w-full">
        <div className="label">
          <span className="label-text" onChange={handleFilterChange}>
            Choose mutiple car type:
          </span>
        </div>
        <Select
          name="category"
          onChange={(choice) => setCarTypeChoice(choice)}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={categoryOptions}
          styles={colourStyles}
        />
      </label>
      <div className="flex flex-col gap-4 w-full">
        <label className="form-control">
          Min Price:
          <input
            type="number"
            className="input input-bordered"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </label>
        <label className="form-control">
          Max Price:
          <input
            type="number"
            className="input input-bordered"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <button
        onClick={() => applyFilters()}
        className="btn btn-primary max-w-xs w-full"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default VehicleListFilter;
