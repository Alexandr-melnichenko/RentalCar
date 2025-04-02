import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const validationSchema = Yup.object().shape({
  mileAgeFrom: Yup.number().min(0, "Пробіг не може бути відʼємним"),
  mileAgeTo: Yup.number().min(
    Yup.ref("mileAgeFrom"),
    "Максимальний пробіг має бути більшим за мінімальний"
  ),
});

export const FilterForm = ({ onFilter }) => {
  return (
    <Formik
      initialValues={{ brand: "", price: "", mileAgeFrom: "", mileAgeTo: "" }}
      validationSchema={validationSchema}
      onSubmit={onFilter}
    >
      <Form>
        <div>
          <label>Car brand</label>
          <Field as="select" name="brand" placeholder="Choose a brand">
            <option value="">All</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Toyota">Toyota</option>
            <option value="BMW">BMW</option>
            <option value="Honda">Honda</option>
            <option value="Bently">Bently</option>
            <option value="Opel">Opel</option>
          </Field>
        </div>

        <div>
          <label>Price/1 hour</label>
          <Field as="select" name="price" placeholder="Choose a price">
            <option value="">All</option>
            <option value="40">40</option>
            <option value="60">60</option>
            <option value="90">90</option>
            <option value="30">30</option>
            <option value="100">100</option>
            <option value="20">20</option>
          </Field>
        </div>

        <div>
          <label>Car mileage/km</label>
          <Field type="number" name="mileAgeFrom" placeholder="From" />
          <Field type="number" name="mileAgeTo" placeholder="To" />
        </div>
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};
