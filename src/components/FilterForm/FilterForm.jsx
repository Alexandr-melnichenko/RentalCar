import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCars } from "../../redux/selectors";
import style from "./FilterForm.module.css";
import { fetchFilteredCars } from "../../redux/operations";
// import { resetFilterResult } from "../../redux/carsSlice";

// const validationSchema = Yup.object().shape({
//   mileageFrom: Yup.number()
//     .min(0, "Mileage cannot be negative")
//     .nullable()
//     .transform((value) => (isNaN(value) ? null : value)),
//   mileageTo: Yup.number()
//     .min(Yup.ref("mileageFrom"), "Max mileage must be greater than min mileage")
//     .nullable()
//     .transform((value) => (isNaN(value) ? null : value)),
// });

export const FilterForm = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectAllCars);

  const uniqueBrands = [...new Set(cars.map((car) => car.brand))];

  const uniquePrices = [...new Set(cars.map((car) => car.rentalPrice))].sort(
    (a, b) => a - b
  );

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form values:", values);
    // Prepare filters object
    const filters = {
      brand: values.brand || undefined,
      rentalPrice: values.rentalPrice || undefined,
      minMileage: values.minMileage || undefined,
      maxMileage: values.maxMileage || undefined,
    };
    console.log("Filters prepared:", filters);
    // Reset previous results before new filtering
    // dispatch(resetFilterResult());

    // Dispatch filtered cars fetch
    dispatch(fetchFilteredCars(filters)).finally(() => setSubmitting(false));
  };

  return (
    <Formik
      initialValues={{
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
      }}
      // validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
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
              name="rentalPrice"
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
                type="string"
                name="minMileage"
                placeholder="From"
                className={style.fieldMileAge}
                min="0"
              />
              <Field
                type="string"
                name="maxMileage"
                placeholder="To"
                className={style.fieldMileAge}
                min={values.mileageFrom || 0}
              />
            </div>
          </div>
          <button
            type="submit"
            className={style.btnSearch}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Searching..." : "Search"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
