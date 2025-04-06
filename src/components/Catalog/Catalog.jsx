import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/operations";
import { FilterForm } from "../FilterForm/FilterForm";
import {
  selectAllCars,
  selectFavorites,
  selectFilteredCars,
  selectIsFilterApplied,
  selectIsLoading,
} from "../../redux/selectors";
import style from "./Catalog.module.css";
import { Link } from "react-router-dom";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { loadFavorites } from "../../redux/favorites/favoritesReducer";

export const Catalog = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectAllCars);
  const filteredCars = useSelector(selectFilteredCars);
  const isFilterApplied = useSelector(selectIsFilterApplied);
  const isLoading = useSelector(selectIsLoading);
  const favorites = useSelector(selectFavorites);
  console.log("cars:", cars);

  const carsToShow = isFilterApplied ? filteredCars : cars;

  useEffect(() => {
    dispatch(fetchCars());
    dispatch(loadFavorites());
  }, [dispatch]);

  let content;
  if (isLoading) {
    content = <p className={style.message}>Loading cars...</p>;
  } else if (cars.length === 0) {
    // Якщо немає машин взагалі (перше завантаження)
    content = <p className={style.message}>No cars available</p>;
  } else if (isFilterApplied && filteredCars.length === 0) {
    // Якщо фільтр застосовано, але нічого не знайдено
    content = <p className={style.message}>No cars match your filters</p>;
  } else {
    content = carsToShow.map((car) => {
      const isFavorite = favorites.some((favCar) => favCar.id === car.id);
      return (
        <li key={car.id} className={style.liBox}>
          <div className={style.imgBox}>
            <FavoriteButton car={car} isFavorite={isFavorite} />
            <img src={car.img} alt={car.model} className={style.img} />
          </div>

          <div className={style.titleBox}>
            <p className={style.title}>
              {car.brand} <span className={style.blueTitle}>{car.model}</span>,
              ({car.year})
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
      );
    });
  }

  return (
    <div>
      <FilterForm />
      <ul className={style.ulWrapper}>{content}</ul>
    </div>
  );
};
