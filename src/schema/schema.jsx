import * as yup from "yup";

// Signup Schema
export const signupSchema = yup.object({
  name: yup
    .string()
    .max(30, "max thirty characters are required")
    .required("Please fill in your name"),
  email: yup.string().required("Please fill in valid email"),
  password: yup
    .string()
    .min(8, "min eight characters are required")
    .required("Please fill in password"),
});

// Login Schema
export const loginSchema = yup.object({
  email: yup.string().required("Please fill in valid email"),
  password: yup
    .string()
    .min(8, "min eight characters are required")
    .required("Please fill in password"),
});

// Verify Email Schema
export const verifyEmailSchema = yup.object({
  email: yup.string().required("Please fill in valid email"),
});

// Password Reset Schema
export const passwordResetSchema = yup.object({
  password: yup
    .string()
    .min(8, "min eight characters are required")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), "password not match"])
    .required("Password confirm is required"),
});

// Review Schema
export const reviewSchema = yup.object({
  comment: yup
    .string()
    .min(3, "min three characters are required")
    .required("Please fill the comment"),
});

// Create Vehicle Schema
export const createVehicleSchema = yup.object({
  name: yup.string().required("please fill in vehicle name"),
  hostCarImage: yup.array().max(5, "Can upload max five images"),
  carType: yup.string().required("please select vehicle type"),
  fuelType: yup.string().required("please select fuel type"),
  transmission: yup.string().required("please select transmission"),
  seats: yup.string().required("please select No. of seats"),
  pricePerHour: yup
    .number()
    .min(1, "min one is required")
    .required("please fill in the price per hour"),
});
