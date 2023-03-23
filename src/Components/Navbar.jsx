import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "./../hooks/useLogout";

import Temple from "../assets/chess-rook.svg";

import "./Navbar.css";
import { useAuthContext } from "./../hooks/useAuthContext";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="Temple" />
          <span>JointerApp</span>
        </li>
        {!user && (
          <>
            <li className="navs">
              <Link to="/login">Login</Link>
            </li>
            <li className="navs">
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Log out
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Logging out...
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
