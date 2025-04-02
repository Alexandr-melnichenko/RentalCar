import { NavLink } from "react-router";
import style from "./Logo.module.css";

export const Logo = () => {
  return (
    <NavLink to="/" className={style.logo}>
      Rental<span className={style.logoRed}>Car</span>
    </NavLink>
  );
};
