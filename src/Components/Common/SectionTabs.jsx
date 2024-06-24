import React from "react";
import FAQs from "./FAQs";
import TripProtection from "./TripProtection";
import Reviews from "../Review/Reviews";

function SectionTabs({ currentVehicleDetails }) {
  return (
    <div className="reivews-section">
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Reivews"
          checked
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
        <input
          type="radio"
          id="benefits-tab"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Benefits"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <span className="text-lg font-bold">Travel with confidence</span>
          <p className="text-xs">Choose a plan & secure your trip</p>
          <TripProtection />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="FAQs"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <p className="text-lg font-bold mb-4">FAQs</p>
          <FAQs />
        </div>
      </div>
    </div>
  );
}

export default SectionTabs;
