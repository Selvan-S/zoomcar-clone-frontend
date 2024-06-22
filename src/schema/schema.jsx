import * as yup from "yup";
export const signupSchema = yup.object({
  name: yup
    .string()
    .max(30, "max thirty characters are required")
    .required("Please fill in name"),
  email: yup.string().required("Please fill in email"),
  password: yup
    .string()
    .min(8, "min eight characters are required")
    .required("Please fill in password"),
});
export const loginSchema = yup.object({
  email: yup.string().required("Please fill in email"),
  password: yup
    .string()
    .min(8, "min eight characters are required")
    .required("Please fill in password"),
});
