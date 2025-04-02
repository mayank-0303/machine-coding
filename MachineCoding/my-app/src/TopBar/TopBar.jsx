import "./TopBar.css";
import { NavLink } from "react-router";
import Skull from "../assets/skull.svg";
import AutoCompleteInput from "./AutoCompleteInput";

const TopBar = () => {
  return (
    <div className="topbar-container f-w">
      <div className="left-section">
        <nav>
          <NavLink to="/home" className={`nav-item`}>
            Home
          </NavLink>
          <NavLink to="/hooks" className={`nav-item`}>
            Hooks
          </NavLink>
          <NavLink to="/jira-board" className={`nav-item`}>
            Jira Board
          </NavLink>
          <NavLink to="/misc" className={`nav-item`}>
            Misc
          </NavLink>
        </nav>
      </div>
      <div className="right-section">
        <AutoCompleteInput />
        <img height="40px" src={Skull} alt="skull logo" className="app-logo" />
      </div>
    </div>
  );
};

export default TopBar;
