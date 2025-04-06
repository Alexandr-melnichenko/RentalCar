import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCars } from "../../redux/selectors";
import style from "./FilterForm.module.css";
import { fetchFilteredCars } from "../../redux/operations";

const validationSchema = Yup.object().shape({
  brand: Yup.string(),
  rentalPrice: Yup.string(),
  minMileage: Yup.number().typeError(" ").positive(" ").integer(" "),
  maxMileage: Yup.number().typeError(" ").positive(" ").integer(" "),
});

export const FilterForm = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectAllCars);

  const uniqueBrands = [...new Set(cars.map((car) => car.brand))];
  const uniquePrices = [...new Set(cars.map((car) => car.rentalPrice))].sort(
    (a, b) => a - b
  );

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form values:", values);

    if (
      values.minMileage &&
      values.maxMileage &&
      +values.minMileage > +values.maxMileage
    ) {
      values.maxMileage = "";
    }

    const filters = {
      brand: values.brand || undefined,
      rentalPrice: values.rentalPrice || undefined,
      minMileage: values.minMileage || undefined,
      maxMileage: values.maxMileage || undefined,
    };
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
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, values, setFieldValue }) => (
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
                type="number"
                name="minMileage"
                placeholder="From"
                className={style.leftFieldMileAge}
                min="0"
                onBlur={(e) => {
                  if (
                    values.maxMileage &&
                    +e.target.value > +values.maxMileage
                  ) {
                    setFieldValue("maxMileage", "");
                  }
                }}
              />
              <Field
                type="number"
                name="maxMileage"
                placeholder="To"
                className={style.rightFieldMileAge}
                min={values.minMileage || 0}
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
