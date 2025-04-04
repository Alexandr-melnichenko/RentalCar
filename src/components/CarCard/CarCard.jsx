import { useDispatch, useSelector } from "react-redux";
import { selectCar } from "../../redux/selectors";
import { useParams } from "react-router";
import { useEffect } from "react";
import { fetchSelectedCar } from "../../redux/operations";

export const CarCard = () => {
  const { carId } = useParams();
  console.log("carId:", carId);
  const dispatch = useDispatch();
  const car = useSelector(selectCar);
  console.log("Car data in CarCard:", car);

  useEffect(() => {
    dispatch(fetchSelectedCar(carId));
  }, [carId, dispatch]);

  if (!car) return <div>Loading...</div>;

  const carPhoto = car.img;
  return <>{carPhoto}</>;
};
