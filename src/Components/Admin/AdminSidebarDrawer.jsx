import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminVehicleListView from "./AdminVehicleListView";
import PostVehicleForm from "./PostVehicleForm";

function AdminSidebarDrawer() {
  const [show, setShow] = useState({ active: "VehicleList" });
  const navigateTo = useNavigate();
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:justify-between">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <button
            className="mx-2 flex-1 px-2 btn btn-ghost max-w-40"
            onClick={() => navigateTo("/")}
          >
            Zoomcar Clone
          </button>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal flex gap-4 self-end">
              {/* Navbar menu content here */}
              <li>
                <button
                  className={`${show.active == "Home" ? "text-primary" : ""} `}
                  onClick={() => {
                    setShow({ active: "Home" });
                    navigateTo("/");
                  }}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className={`${
                    show.active == "VehicleList" ? "text-primary" : ""
                  }`}
                  onClick={() => setShow({ active: "VehicleList" })}
                >
                  Vehicle List
                </button>
              </li>
              <li>
                <button
                  className={`${
                    show.active == "CreateVehicle" ? "text-primary" : ""
                  }`}
                  onClick={() => setShow({ active: "CreateVehicle" })}
                >
                  Create Vehicle
                </button>
              </li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <div className="max-md:w-full md:w-4/5 mx-auto my-10 px-4">
          <div className="max-w-screen-md mx-auto">
            {show && show.active == "CreateVehicle" && <PostVehicleForm />}
          </div>
          <div className="">
            {show && show.active == "VehicleList" && <AdminVehicleListView />}
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 min-h-full w-80 p-4 flex flex-col justify-center">
          {/* Sidebar content here */}

          <div className="mt-20 flex gap-4 flex-col">
            <button
              className={`${
                show.active == "Home" ? "btn-primary" : ""
              } btn btn-outline`}
              onClick={() => {
                setShow({ active: "Home" });
                navigateTo("/");
              }}
            >
              Home
            </button>
            <button
              className={`${
                show.active == "VehicleList" ? "btn-primary" : ""
              } btn btn-outline`}
              onClick={() => setShow({ active: "VehicleList" })}
            >
              Vehicle List
            </button>
            <button
              className={`${
                show.active == "CreateVehicle" ? "btn-primary" : ""
              } btn btn-outline`}
              onClick={() => setShow({ active: "CreateVehicle" })}
            >
              Create Vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebarDrawer;
