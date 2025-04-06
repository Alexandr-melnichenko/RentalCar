import { Header } from "../../components/Header/Header";
import { Hero } from "../../components/Hero/Hero";
import style from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={style.homePage}>
      <Header className={style.header} />
      <Hero className={style.hero} />
    </div>
  );
};
