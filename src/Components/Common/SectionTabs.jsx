import React, { useState } from "react";
import FAQs from "./FAQs";
import TripProtection from "./TripProtection";
import Reviews from "../Review/Reviews";

function SectionTabs({ currentVehicleDetails }) {
  const [checkedTab, setCheckedTab] = useState("reviews");
  return (
    <div className="reivews-section">
      {/* Reivews */}
      <div role="tablist" className="tabs tabs-lifted tabs-lg">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className={`${
            checkedTab == "reviews"
              ? "[--tab-border-color:#7480d8] [--tab-color:#7480d8] [--tab-border-width: 5px] tab-active"
              : "bg-base-100"
          } tab`}
          value={checkedTab}
          onChange={() => setCheckedTab("reviews")}
          aria-label="Reviews"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <span className="uppercase text-xs font-bold">reviews</span>
          <div>
            <Reviews currentVehicleDetails={currentVehicleDetails} />
          </div>
        </div>
        {/* Trip protection */}
        <input
          type="radio"
          id="benefits-tab"
          name="my_tabs_2"
          role="tab"
          aria-label="Benefits"
          value={checkedTab}
          onChange={() => setCheckedTab("tripProtection")}
          className={`${
            checkedTab == "tripProtection"
              ? "[--tab-border-color:#7480d8] [--tab-color:#7480d8] tab-active"
              : "bg-base-100"
          } tab`}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <span className="text-lg font-bold">Travel with confidence</span>
          <p className="text-xs">Choose a plan & secure your trip</p>
          <TripProtection />
        </div>
        {/* FAQs */}
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className={`${
            checkedTab == "FAQs"
              ? "[--tab-border-color:#7480d8] [--tab-color:#7480d8] tab-active"
              : "bg-base-100"
          } tab`}
          aria-label="FAQs"
          value={checkedTab}
          onChange={() => setCheckedTab("FAQs")}
        />
        <div
          role="tabpanel"
          className={`tab-content border-base-300 rounded-box p-6`}
        >
          <p className="text-lg font-bold mb-4">FAQs</p>
          <FAQs />
        </div>
      </div>
    </div>
  );
}

export default SectionTabs;
