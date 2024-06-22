import React from "react";
import VehicleFilter from "./VehicleFilter";
import VehicleListFilter from "./VehicleListFilter";
import TimeRangeSlider from "../Common/TimeRangeSlider";

function VehicleFilterDrawer({ children }) {
  return (
    <div className="drawer mt-10 p-4">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="flex flex-col gap-4">
          <label
            htmlFor="my-drawer"
            className="btn btn-primary drawer-button max-w-28 mb-2"
          >
            Open Filter
          </label>
          {/* Page content here */}
          {children}
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <VehicleListFilter />
          <TimeRangeSlider />
        </div>
      </div>
    </div>
  );
}

export default VehicleFilterDrawer;
