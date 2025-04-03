import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/operations";
import { FilterForm } from "../FilterForm/FilterForm";
import { selectCars, selectFilteredCars } from "../../redux/selectors";
import style from "./Catalog.module.css";
import { Link } from "react-router-dom";

export const Catalog = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const filteredCars = useSelector(selectFilteredCars);
  console.log("cars:", cars);
  console.log("filteredCars:", filteredCars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  // const carsToShow = filteredCars.length > 0 ? filteredCars : cars;
  // const carsToShow =
  //   filteredCars.length > 0
  //     ? filteredCars
  //     : filteredCars.length === 0 && cars.length > 0
  //     ? []
  //     : cars;

  // console.log("cars:", cars);
  // console.log("filteredCars:", filteredCars);
  // console.log("carsToShow:", carsToShow);

  // if (!cars || !filteredCars) {
  //   console.log("Данные ещё загружаются...");

  //   console.log("cars length:", cars.length);
  //   if (cars.length === 0) {
  //     console.log("Данные ещё не загружены!");
  //   }
  // }

  const hasCars = cars.length > 0;
  const hasFilteredCars = filteredCars.length > 0;
  const isFilterApplied = filteredCars !== cars;

  const carsToShow = filteredCars.length > 0 ? filteredCars : cars;

  let content;
  if (!hasCars) {
    content = <p>Loading cars...</p>;
  } else if (isFilterApplied && !hasFilteredCars) {
    content = <p>Not found cars...</p>;
  } else {
    content = carsToShow.map((car) => (
      <li key={car.id} className={style.liBox}>
        <img src={car.img} alt={car.model} className={style.img} />
        <div className={style.titleBox}>
          <p className={style.title}>
            {car.brand} <span className={style.blueTitle}>{car.model}</span>, (
            {car.year})
          </p>
          <p className={style.title}>${car.rentalPrice}</p>
        </div>

        <div className={style.grayTextBox}>
          <p className={style.grayText}>
            {car.address.split(/,\s*/).slice(-2).join(" | ")} |{" "}
            {car.rentalCompany} |
          </p>
          <p className={style.grayText}>
            {car.type} | {car.mileage}km |
          </p>
        </div>

        <Link to={`/catalog/${car.id}`} className={style.btn}>
          Read more
        </Link>
      </li>
    ));
  }

  return (
    <div>
      <FilterForm />
      <ul className={style.ulWrapper}>{content}</ul>
    </div>
  );
};
