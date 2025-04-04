// import { CarCard } from "../../components/CarCard/CarCard";
// import { CardDescription } from "../../components/CardDescription/CardDescription";
// import { CardForm } from "../../components/CardForm/CardForm";
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
  const car = useSelector((state) => selectCar(state, id)); // Передаём carId в селектор
  console.log("Car data in CarCard:", car);
  console.log("useParams() result:", useParams());

  // const car = useSelector(selectCar);
  // console.log("Car data in CarCard:", car);

  useEffect(() => {
    if (id) {
      // Добавляем проверку
      console.log("Dispatching fetch for id:", id);
      dispatch(fetchSelectedCar(id));
    }
  }, [id, dispatch]);

  if (!id) return <div>Error: No car ID specified</div>;
  if (!car) return <div>Loading...</div>;

  const carPhoto = car.img;

  return (
    <div>
      <Header />
      <img
        src={carPhoto}
        alt={`${car.brand} ${car.model}`}
        className={style.carImage} // Опционально: если используете CSS-модули
      />
    </div>
  );
};
