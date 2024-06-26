import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FullScreenLoading from "../Components/Common/FullScreenLoading";
import Navbar from "../Components/Common/Navbar";
import MainComponent from "../Components/MainComponent/MainComponent";
import VehicleCard from "../Components/Vehicle/VehicleCard";
import VehicleFilterDrawer from "../Components/Vehicle/VehicleFilterDrawer";
import { VehicleContext } from "../Components/context/VehicleContext";

const VehicleList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = window.location.href;
  const searchQuery = location.split("?")[1];
  const { setFilters, setCurrentSearchLocation, isLoading } =
    useContext(VehicleContext);
  let category = searchParams.get("carType");
  let minPrice = searchParams.get("gte");
  let maxPrice = searchParams.get("lte");

  useEffect(() => {
    setFilters({
      category,
      minPrice,
      maxPrice,
    });
  }, [category, minPrice, maxPrice]);

  useEffect(() => {
    setCurrentSearchLocation(searchQuery);
  }, [searchQuery]);

  const { vehicles } = useContext(VehicleContext);
  return (
    <MainComponent>
      <Navbar />
      <VehicleFilterDrawer>
        <div className="flex justify-center">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            {!vehicles?.length ? (
              <div className="text-lg text-primary text-center mt-10">
                No Results Found
              </div>
            ) : (
              vehicles.map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))
            )}
          </div>
        </div>

        {isLoading && <FullScreenLoading />}
      </VehicleFilterDrawer>
    </MainComponent>
  );
};

export default VehicleList;
