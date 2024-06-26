import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { signupSchema } from "../../schema/schema";
import { useAuth } from "../context/AuthContext";
import FullScreenLoading from "../Common/FullScreenLoading";

function SignupForm() {
  const { loading, signup, error, setError, activationMailAlert } = useAuth();

  useEffect(() => {
    setError(null);
  }, []);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: signupSchema,
      onSubmit: (signupCredentials) => {
        signup(signupCredentials);
      },
    });
  return (
    <>
      {/* If the activation link sent, show successful alert*/}
      {activationMailAlert && (
        <div className="max-w-full">
          <div role="alert" className="alert alert-success flex flex-row">
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
            <div>
              <p>
                Successfully sent Activation link to your email. Please check
                your inbox or spam folder.
              </p>
              <p>
                Once activated, please proceed with{" "}
                <Link to={"/login"}>
                  <span className="link link-warning no-underline">
                    logging in
                  </span>
                  .
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
      <div className={`${activationMailAlert && "hidden"}`}>
        <h1 className="text-3xl text-center mb-4">Sign up</h1>
        <form className="" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
              required
            />
            {touched.name && errors.name && (
              <p className="text-center text-red-600 mt-3">{errors.name}</p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
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
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Password
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
          <div className="flex items-start mb-5">
            <p>
              Have an account?{" "}
              <Link to={"/login"}>
                <span className="link link-primary no-underline">Log in</span>
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-500 disabled:cursor-no-drop disabled:hover:bg-blue-500"
            disabled={loading}
          >
            Sign up
          </button>
          {error && <p className="text-center text-red-600 mt-3">{error}</p>}
        </form>
      </div>
      {loading && <FullScreenLoading />}
    </>
  );
}

export default SignupForm;
