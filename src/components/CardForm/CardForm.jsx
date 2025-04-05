// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import style from "./CardForm.module.css";
// import { useDispatch, useSelector } from "react-redux";

// const handleSubmit = (values, { setSubmitting }) => {
//   return;
// };

// export const CardForm = () => {
//   const dispatch = useDispatch();

//   return (
//     <Formik
//       initialValues={{
//         brand: "",
//         rentalPrice: "",
//         minMileage: "",
//         maxMileage: "",
//       }}
//       // validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     ></Formik>
//   );
// };

import { useState } from "react";
import { useFormik } from "formik";
// import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCar } from "../../redux/selectors";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  TextareaAutosize,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Стилізовані компоненти
const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  maxWidth: "500px",
  margin: "0 auto",
  padding: "24px",
  borderRadius: "8px",
  boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
});

const StyledDatePicker = styled(DatePicker)({
  width: "100%",
  padding: "16.5px 14px",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
  fontSize: "16px",
  "&:hover": {
    borderColor: "rgba(0, 0, 0, 0.87)",
  },
});

export const CardForm = () => {
  // const { id } = useParams();
  const car = useSelector(selectCar);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Required field";
      }

      if (!values.email) {
        errors.email = "Required field";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email format";
      }

      if (!startDate || !endDate) {
        errors.dateRange = "Please select a booking period";
      }

      return errors;
    },
    onSubmit: (values) => {
      const bookingData = {
        carId: car.id,
        carModel: `${car.brand} ${car.model}`,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        ...values,
      };

      console.log("Дані бронювання:", bookingData);

      toast.success(
        `Booking ${car.brand} ${
          car.model
        } from ${startDate.toLocaleDateString()} 
        to ${endDate.toLocaleDateString()} successfully completed!`,
        {
          position: "top-center",
          autoClose: 5000,
        }
      );

      formik.resetForm();
      setDateRange([null, null]);
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Book your car now
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Stay connected! We are always ready to help you.
        </Typography>

        <StyledForm onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Повне ім'я"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <FormControl error={Boolean(formik.errors.dateRange)}>
            <StyledDatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
                formik.setFieldTouched("dateRange", true);
              }}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select booking period"
              isClearable
            />
            {formik.errors.dateRange && (
              <FormHelperText>{formik.errors.dateRange}</FormHelperText>
            )}
          </FormControl>

          <TextareaAutosize
            id="comment"
            name="comment"
            placeholder="Comment (optional)"
            minRows={4}
            value={formik.values.comment}
            onChange={formik.handleChange}
            style={{
              width: "100%",
              padding: "16px",
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
              fontFamily: "inherit",
              fontSize: "16px",
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="#3470FF"
            size="normal"
            disabled={formik.isSubmitting}
          >
            Send
          </Button>
        </StyledForm>
      </Box>

      <ToastContainer />
    </Container>
  );
};
