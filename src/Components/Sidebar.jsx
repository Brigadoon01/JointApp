import { useAuthContext } from "../hooks/useAuthContext";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";
import Avatar from "./Avatar";
import "./Sidebar.css";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL}/>
          <p>Hey {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact="true" to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li><NavLink to="/create">
                <img src={AddIcon} alt="add icon" />
                <span>New Project</span>
            </NavLink></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
