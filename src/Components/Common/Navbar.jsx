import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
                <img alt="avatar" src="src/assets/headshort.jpeg" />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {user && user?.role == "admin" && (
              <li>
                <button
                  className="justify-between"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </button>
              </li>
            )}
            <li>
              <button
                className="justify-between"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
            </li>
            {user && (
              <li>
                <button
                  className="justify-between"
                  onClick={() => navigate("/user/bookings")}
                >
                  Your Bookings
                </button>
              </li>
            )}
            <li>
              {user ? (
                <button onClick={() => logout()}>Logout</button>
              ) : (
                <button onClick={() => navigate("/login")}>Login</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
