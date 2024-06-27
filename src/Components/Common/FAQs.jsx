import React from "react";

function FAQs() {
  return (
    <div className="flex gap-2 flex-col">
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl max-sm:text-lg font-medium">
          How do I book a car?
        </div>
        <div className="collapse-content">
          <p>
            - Simply select the dates and the car of your choice, <br />- Select
            the location you want to pick it up from or get it delivered at{" "}
            <br />- Choose your preferred mode of payment to pay and you are
            ready to Zoom!
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl max-sm:text-lg font-medium">
          What does Fastag enabled means?
        </div>
        <div className="collapse-content">
          <p>
            FASTag enabled means <br />- The car will have FAStag installed{" "}
            <br />- You'll have the option to recharge it if you intend to go
            through tolls
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl max-sm:text-lg font-medium">
          Who will recharge the FASTag?
        </div>
        <div className="collapse-content">
          <p>
            You will recharge the FASTag as per your usage for the booking. You
            can reach out to the Host and they'll provide you with the FASTag
            recharge details.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl max-sm:text-lg font-medium">
          What happens if I forget my personal belongings in the car?
        </div>
        <div className="collapse-content">
          <p>
            Zoomcar does not take any responsibility for personal belongings
            left by you in the car. <br />
            - Please remove all your personal belongings from the car before
            ending the trip <br />- If you end up forgetting any belongings in
            the car, you may reach out to the host to retrieve it
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
