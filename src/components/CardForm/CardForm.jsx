import { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { selectCar } from "../../redux/selectors";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Стилізовані компоненти

const StyledFormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "640px",
  height: "auto",
  backgroundColor: "#FFFFFF",
  border: "1px solid #DADDE1",
  borderRadius: "10px",
  padding: "32px",
  boxSizing: "border-box",
});

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

const StyledTextField = styled(TextField)({
  width: "100%",
  backgroundColor: "#F7F7F7",
  borderRadius: "12px",
  "& .MuiOutlinedInput-root": {
    height: "48px",
    "& fieldset": {
      border: "none",
    },
    "& input": {
      padding: "14px 20px",
      fontFamily: "Manrope",
      fontSize: "16px",
      color: "#101828",
    },
    "& textarea": {
      padding: "14px 20px",
      fontFamily: "Manrope",
      fontSize: "16px",
      color: "#101828",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#8D929A",
    fontFamily: "Manrope",
    fontSize: "16px",
  },
});

const StyledTextArea = styled(StyledTextField)({
  "& .MuiOutlinedInput-root": {
    height: "88px",
  },
});

const StyledButton = styled(Button)({
  width: "156px",
  height: "44px",
  backgroundColor: "#3470FF",
  borderRadius: "12px",
  border: "none",
  color: "#FFFFFF",
  fontFamily: "Manrope",
  fontSize: "16px",
  fontWeight: 500,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#3470FF",
  },
});

const StyledDatePicker = styled(DatePicker)({
  width: "100%",
  height: "48px",
  backgroundColor: "#F7F7F7",
  borderRadius: "12px",
  border: "none",
  // padding: "14px 20px",
  fontFamily: "Manrope",
  fontSize: "16px",
  color: "#101828",
  paddingLeft: "20px",
  boxSizing: "border-box",
  "&:focus": {
    outline: "none",
  },
});

export const CardForm = () => {
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
    <StyledFormContainer component="form" onSubmit={formik.handleSubmit}>
      {/* Заголовок форми */}
      <Typography
        sx={{
          fontWeight: 600,
          color: "#101828",
          fontSize: "20px",
          textAlign: "left",
          mb: "8px",
        }}
      >
        Book your car now
      </Typography>

      {/* Підзаголовок */}
      <Typography
        sx={{
          fontWeight: 500,
          color: "#8D929A",
          fontSize: "16px",
          textAlign: "left",
          mb: "24px",
        }}
      >
        Stay connected! We are always ready to help you.
      </Typography>

      {/* Поля форми */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <StyledTextField
          id="name"
          name="name"
          label="Name*"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <StyledTextField
          fullWidth
          id="email"
          name="email"
          label="Email*"
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

        <StyledTextArea
          id="comment"
          name="comment"
          label="Comment"
          variant="outlined"
          multiline
          rows={3}
          value={formik.values.comment}
          onChange={formik.handleChange}
        />
      </Box>

      {/* Кнопка */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: "24px" }}>
        <StyledButton type="submit" variant="contained">
          Send
        </StyledButton>
      </Box>

      <ToastContainer />
    </StyledFormContainer>
  );
};
