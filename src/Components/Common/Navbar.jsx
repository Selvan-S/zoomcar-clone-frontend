import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeadShortPlaceholder from "../../assets/headshort.jpeg";
function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="top-0 navbar bg-base-100">
      <div className="flex-1">
        <button className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
          Zoomcar clone
        </button>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user?.userAvatarLink ? (
                <img alt="avatar" src={user.userAvatarLink} />
              ) : user?.name ? (
                <span className="uppercase text-3xl">
                  {user.name.substring(0, 1)}
                </span>
              ) : (
                <img alt="avatar" src={HeadShortPlaceholder} />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-50 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-64"
          >
            <li>
              <button
                className="justify-between py-2 text-base max-sm:text-sm"
                onClick={() => navigate("/")}
              >
                Home
              </button>
            </li>
            {user && user?.role == "admin" && (
              <li>
                <button
                  className="justify-between py-2 text-base max-sm:text-sm"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </button>
              </li>
            )}
            {user && user?.role == "admin" && (
              <li>
                <button
                  className="justify-between py-2 text-base max-sm:text-sm"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </button>
              </li>
            )}
            <li>
              <button
                className="justify-between py-2 text-base max-sm:text-sm"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                className="justify-between py-2 text-base max-sm:text-sm"
                onClick={() => navigate("/user/hostVehicle")}
              >
                Host Your Vehicle
              </button>
            </li>
            {user && (
              <li>
                <button
                  className="justify-between py-2 text-base max-sm:text-sm"
                  onClick={() => navigate("/user/hostedVehicleStatus")}
                >
                  Hosted Vehicle Status
                </button>
              </li>
            )}
            {user && (
              <li>
                <button
                  className="justify-between py-2 text-base max-sm:text-sm"
                  onClick={() => navigate("/user/bookings")}
                >
                  Your Bookings
                </button>
              </li>
            )}

            <li>
              {user ? (
                <button
                  onClick={() => logout()}
                  className="py-3 text-lg max-sm:text-sm"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="py-3 text-base max-sm:text-sm"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
