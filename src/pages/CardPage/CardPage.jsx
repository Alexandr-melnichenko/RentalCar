import { CardForm } from "../../components/CardForm/CardForm";
import { Header } from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { selectCar } from "../../redux/selectors";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSelectedCar } from "../../redux/operations";
import style from "./CardPage.module.css";

export const CardPage = () => {
  const { id } = useParams();
  console.log("id from useParams:", id);
  const dispatch = useDispatch();
  console.log("useParams() result:", useParams());

  useEffect(() => {
    if (id) {
      // Добавляем проверку
      console.log("Dispatching fetch for id:", id);
      dispatch(fetchSelectedCar(id));
    }
  }, [id, dispatch]);

  const car = useSelector(selectCar);
  console.log("Car data in CarCard second version:", car);

  if (!id) return <div>Error: No car ID specified</div>;
  if (!car || Object.keys(car).length === 0) return <div>Loading...</div>;

  const carPhoto = car?.img || "";

  // Дістаємо айді із урла картинки
  function extractDigitsFromUrl(url) {
    if (!url) return null;
    try {
      const match = url.match(/\/(\d+)-/);
      return match ? match[1] : "0000";
    } catch (e) {
      console.error("Error parsing URL:", e);
      return null;
    }
  }

  const digits = extractDigitsFromUrl(carPhoto);

  const conditions = car?.rentalConditions || [];
  const accessories = car?.accessories || [];
  const functionalities = car?.functionalities || [];
  const accesAndFuncs = [...accessories, ...functionalities];

  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.firstColumn}>
          <img
            src={carPhoto}
            alt={`${car.brand} ${car.model}`}
            className={style.carImage} // Опционально: если используете CSS-модули
          />
          <CardForm />
        </div>

        <div className={style.secondColumn}>
          <div className={style.titleBlock}>
            <div className={style.titleBox}>
              <p className={style.title}>
                {car.brand} {car.model}, ({car.year})&nbsp;&nbsp;&nbsp;
                <span className={style.grayText}>id: {digits}</span>
              </p>
            </div>
            <p className={style.addressText}>
              <svg className={style.icons}>
                <use xlinkHref="/sprite.svg#icon-Location"></use>
              </svg>
              &nbsp;{car.address.split(/,\s*/).slice(-2).join(", ")}
              &nbsp;&nbsp;&nbsp;Mileage: {car.mileage} km
            </p>
            <p className={style.blueTitle}>${car.rentalPrice}</p>
            <p className={style.descriptionText}>{car.description}</p>
          </div>
          <div className={style.tripleBox}>
            <div className={style.rentalBlock}>
              <h3 className={style.subTitle}>Rental Conditions:</h3>
              <ul className={style.list}>
                {conditions.map((condition, index) => {
                  return (
                    <li
                      key={`${condition}-${index}`}
                      className={style.listItem}
                    >
                      <svg className={style.icons}>
                        <use xlinkHref="/sprite.svg#icon-check-circle"></use>
                      </svg>
                      &nbsp;&nbsp;
                      {condition}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={style.carBlock}>
              <h3 className={style.subTitle}>Car Specifications:</h3>
              <div className={style.list}>
                <p className={style.listItem}>
                  <svg className={style.icons}>
                    <use xlinkHref="/sprite.svg#icon-calendar"></use>
                  </svg>
                  &nbsp;&nbsp; Year: {car.year}
                </p>
                <p className={style.listItem}>
                  <svg className={style.icons}>
                    <use xlinkHref="/sprite.svg#icon-car"></use>
                  </svg>
                  &nbsp;&nbsp; Type: {car.type}
                </p>
                <p className={style.listItem}>
                  <svg className={style.icons}>
                    <use xlinkHref="/sprite.svg#icon-fuel-pump"></use>
                  </svg>
                  &nbsp;&nbsp; Fuel Consumption: {car.fuelConsumption}
                </p>
                <p className={style.listItem}>
                  <svg className={style.icons}>
                    <use xlinkHref="/sprite.svg#icon-gear"></use>
                  </svg>
                  &nbsp;&nbsp; Engine Size: {car.engineSize}
                </p>
              </div>
            </div>
            <div className={style.accessoriesBlock}>
              <h3 className={style.subTitle}>
                Accessories and functionalities:
              </h3>
              <ul className={style.list}>
                {accesAndFuncs.map((accessor, index) => {
                  return (
                    <li key={`${accessor}-${index}`} className={style.listItem}>
                      <svg className={style.icons}>
                        <use xlinkHref="/sprite.svg#icon-check-circle"></use>
                      </svg>
                      &nbsp;&nbsp;
                      {accessor}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
