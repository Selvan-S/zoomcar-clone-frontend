import { useFormik } from "formik";
import React, { useEffect } from "react";
import { verifyEmailSchema } from "../../schema/schema";
import FullScreenLoading from "../Common/FullScreenLoading";
import { useAuth } from "../context/AuthContext";

function VerifyEmailForm() {
  const { loading, forgotPassword, error, setError, sentMailAlert } = useAuth();

  useEffect(() => {
    setError(null);
  }, []);
  // Formik to handle form
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: verifyEmailSchema,
      onSubmit: (data) => {
        forgotPassword(data.email);
      },
    });
  return (
    <>
      {/* If the mail sent, show successful alert*/}
      {sentMailAlert && (
        <div className="max-w-full">
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Successfully sent reset link to your verified email. Please check
              your inbox or spam folder.
            </span>
          </div>
        </div>
      )}
      {/* Verify email form to sent reset password link */}
      <div className={`${sentMailAlert && "hidden"}`}>
        <h1 className="text-3xl text-center mb-4">Trouble logging in?</h1>
        <p className="text-center mb-8 text-base">
          Enter your email and we'll send you a reset link to get back into your
          account.
        </p>
        <form className="" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@example.com"
              required
            />
            {touched.email && errors.email && (
              <p className="text-center text-red-600 mt-3">{errors.email}</p>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-500 disabled:cursor-no-drop disabled:hover:bg-blue-500"
            disabled={loading}
          >
            Send reset link
          </button>
          {error && <p className="text-center text-red-600 mt-3">{error}</p>}
        </form>
        {loading && <FullScreenLoading />}
      </div>
    </>
  );
}

export default VerifyEmailForm;
