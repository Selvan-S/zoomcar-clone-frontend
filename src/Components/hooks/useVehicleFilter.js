import { useState } from "react";

const useVehicleFilter = () => {
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 1000,
  });

  const updateFilter = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return { filters, updateFilter };
};

export default useVehicleFilter;
