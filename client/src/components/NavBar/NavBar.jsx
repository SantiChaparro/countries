import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  return (
    <div className={style.navBarContainer}>
      <div className={style.NavBar}>
        <NavLink to="/home">HOME</NavLink>
        <NavLink to="/create">FORM</NavLink>
        <SearchBar />
      </div>
    </div>
  );
};

export default NavBar;
