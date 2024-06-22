import React from "react";

function FullScreenLoading() {
  return (
    <div>
      <div className="w-full h-full fixed top-0 left-0 bg-black opacity-60 z-50">
        <div className="flex justify-center items-center mt-[50vh]">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      </div>
    </div>
  );
}

export default FullScreenLoading;
