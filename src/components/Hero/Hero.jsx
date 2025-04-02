import { Link } from "react-router";
import style from "./Hero.module.css";

export const Hero = () => {
  return (
    <div className={style.backgroundHero}>
      <div className={style.contentBox}>
        <h1 className={style.title}>Find your perfect rental car</h1>
        <h2 className={style.text}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Link to="/catalog" className={style.btn}>
          View Catalog
        </Link>
      </div>
    </div>
  );
};
