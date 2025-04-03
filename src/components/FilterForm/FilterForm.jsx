import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { filterCars } from "../../redux/carsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCars } from "../../redux/selectors";
import style from "./FilterForm.module.css";

const validationSchema = Yup.object().shape({
  mileAgeFrom: Yup.number().min(0, "Пробіг не може бути відʼємним").default(0),
  mileAgeTo: Yup.number()
    .min(
      Yup.ref("mileAgeFrom"),
      "Максимальний пробіг має бути більшим за мінімальний"
    )
    .nullable(),
});

export const FilterForm = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);

  const uniqueBrands = [...new Set(cars.map((car) => car.brand))];

  const uniquePrices = [...new Set(cars.map((car) => car.rentalPrice))].sort(
    (a, b) => a - b
  );

  return (
    <Formik
      initialValues={{
        brand: "",
        price: "",
        mileAgeFrom: "",
        mileAgeTo: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => dispatch(filterCars(values))}
    >
      <Form className={style.form}>
        <div className={style.fieldBlock}>
          <label className={style.label}>Car brand</label>
          <Field
            as="select"
            name="brand"
            placeholder="Choose a brand"
            className={style.fieldSelect}
          >
            <option value="">Choose a brand</option>
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Field>
        </div>

        <div className={style.fieldBlock}>
          <label className={style.label}>Price/1 hour</label>
          <Field
            as="select"
            name="price"
            placeholder="Choose a price"
            className={style.fieldSelect}
          >
            <option value="">Choose a price</option>
            {uniquePrices.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </Field>
        </div>

        <div className={style.fieldBlock}>
          <label className={style.label}>Car mileage/km</label>
          <div className={style.blockMileAge}>
            <Field
              type="number"
              name="mileAgeFrom"
              placeholder="From"
              className={style.fieldMileAge}
            />
            <Field
              type="number"
              name="mileAgeTo"
              placeholder="To"
              className={style.fieldMileAge}
            />
          </div>
        </div>
        <button type="submit" className={style.btnSearch}>
          Search
        </button>
      </Form>
    </Formik>
  );
};
