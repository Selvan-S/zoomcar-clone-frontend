import { useFormik } from "formik";
import React, { useEffect } from "react";
import { passwordResetSchema } from "../../schema/schema";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import FullScreenLoading from "../Common/FullScreenLoading";

function PasswordResetForm() {
  const { resetToken } = useParams();

  const { loading, passwordReset, error, setError } = useAuth();
  useEffect(() => {
    setError(null);
  }, []);
  // Formik to handle password reset form
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
        passwordConfirm: "",
      },
      validationSchema: passwordResetSchema,
      onSubmit: (data) => {
        passwordReset(data.password, resetToken);
      },
    });
  return (
    <>
      <h1 className="text-3xl text-center mb-4">Reset Password</h1>
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {touched.password && errors.password && (
            <p className="text-center text-red-600 mt-3">{errors.password}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="passwordConfirm"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {touched.passwordConfirm && errors.passwordConfirm && (
            <p className="text-center text-red-600 mt-3">
              {errors.passwordConfirm.length > 30
                ? errors.passwordConfirm.split(",")[1].trim()
                : errors.passwordConfirm}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-500 disabled:cursor-no-drop disabled:hover:bg-blue-500"
          disabled={loading}
        >
          Reset password
        </button>
        {error && <p className="text-center text-red-600 mt-3">{error}</p>}
      </form>
      {loading && <FullScreenLoading />}
    </>
  );
}

export default PasswordResetForm;
