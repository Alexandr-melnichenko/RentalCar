import { NavLink } from "react-router";
import style from "./Menu.module.css";

export const Menu = () => {
  return (
    <div className={style.menu}>
      <NavLink to="/" className={style.links}>
        Home
      </NavLink>
      <NavLink to="/catalog" className={style.links}>
        Catalog
      </NavLink>
    </div>
  );
};
