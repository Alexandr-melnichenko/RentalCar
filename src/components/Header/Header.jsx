import { Logo } from "./Logo/Logo";
import { Menu } from "./Menu/Menu";
import style from "./Header.module.css";

export const Header = () => {
  return (
    <div className={style.headerContainer}>
      <Logo />
      <Menu />
    </div>
  );
};
