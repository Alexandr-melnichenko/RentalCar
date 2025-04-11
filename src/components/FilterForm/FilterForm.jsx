import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCars, selectFilteredCars } from "../../redux/selectors";
import style from "./FilterForm.module.css";
import { fetchCars, fetchFilteredCars } from "../../redux/operations";
import { SelectField } from "./SelectField/SelectField";
import {
  resetFilterResult,
  resetFilters,
  resetPagination,
} from "../../redux/carsSlice";

const validationSchema = Yup.object().shape({
  brand: Yup.string(),
  rentalPrice: Yup.string(),
  minMileage: Yup.number().typeError(" ").positive(" ").integer(" "),
  maxMileage: Yup.number().typeError(" ").positive(" ").integer(" "),
});

// Функция для ручного форматирования чисел с запятыми
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const FilterForm = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectAllCars);
  const filteredCars = useSelector(selectFilteredCars);

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

  const handleReset = (resetForm) => {
    dispatch(resetFilterResult());
    dispatch(resetFilters());
    dispatch(resetPagination());
    dispatch(fetchCars());
    resetForm({
      values: {
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
      },
    });
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
      {({ isSubmitting, values, setFieldValue, resetForm }) => (
        <Form className={style.form}>
          <div className={style.fieldBlock}>
            <label className={style.label}>Car brand</label>
            <Field
              name="brand"
              component={SelectField}
              options={[
                { value: "", label: "Choose a brand" },
                ...uniqueBrands.map((brand) => ({
                  value: brand,
                  label: brand,
                })),
              ]}
              placeholder="Choose a brand"
            />
          </div>

          <div className={style.fieldBlock}>
            <label className={style.label}>Price/1 hour</label>
            <Field
              name="rentalPrice"
              component={SelectField}
              isPriceField={true}
              options={[
                { value: "", label: "Choose a price" },
                ...uniquePrices.map((price) => ({
                  value: price,
                  label: price,
                })),
              ]}
              placeholder="Choose a price"
              formatSelectedValue={(value) => (value ? `To $${value}` : value)}
            />
          </div>

          <div className={style.fieldBlock}>
            <label className={style.label}>Car mileage/km</label>
            <div className={style.blockMileAge}>
              <Field
                type="text"
                name="minMileage"
                placeholder="From"
                className={style.leftFieldMileAge}
                onFocus={(e) => {
                  e.target.value = values.minMileage || "";
                }}
                onBlur={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  const formattedValue = rawValue
                    ? formatNumberWithCommas(rawValue)
                    : "";
                  setFieldValue("minMileage", rawValue);
                  e.target.value = formattedValue
                    ? `From ${formattedValue}`
                    : "";

                  if (values.maxMileage && +rawValue > +values.maxMileage) {
                    setFieldValue("maxMileage", "");
                  }
                }}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  setFieldValue("minMileage", rawValue);
                }}
                value={
                  values.minMileage
                    ? `From ${formatNumberWithCommas(values.minMileage)}`
                    : ""
                }
              />
              <Field
                type="text"
                name="maxMileage"
                placeholder="To"
                className={style.rightFieldMileAge}
                onFocus={(e) => {
                  e.target.value = values.maxMileage || "";
                }}
                onBlur={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  const formattedValue = rawValue
                    ? formatNumberWithCommas(rawValue)
                    : "";
                  setFieldValue("maxMileage", rawValue);
                  e.target.value = formattedValue ? `To ${formattedValue}` : "";
                }}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  setFieldValue("maxMileage", rawValue);
                }}
                value={
                  values.maxMileage
                    ? `To ${formatNumberWithCommas(values.maxMileage)}`
                    : ""
                }
                min={values.minMileage || 0}
              />
            </div>
          </div>
          {filteredCars.length > 0 && (
            <button
              onClick={() => handleReset(resetForm)}
              className={style.btnReset}
            >
              Reset
            </button>
          )}
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
