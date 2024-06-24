import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { loginSchema } from "../../schema/schema";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
  const { loading, login, error, setError } = useAuth();
  useEffect(() => {
    setError(null);
  }, []);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (loginCredentials) => {
        login(loginCredentials);
      },
    });
  return (
    <>
      <h1 className="text-3xl text-center mb-4">Log in</h1>
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
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
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
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="link link-primary no-underline">Sign up</span>
            </Link>
          </p>
        </div>
        <div className="flex items-start mb-5">
          <p>
            <Link to={"/verifyEmail"}>
              <span className="link link-primary no-underline">
                Forgot password?
              </span>
            </Link>
          </p>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-500 disabled:cursor-no-drop disabled:hover:bg-blue-500"
          disabled={loading}
        >
          Log in
        </button>
        {error && <p className="text-center text-red-600 mt-3">{error}</p>}
      </form>
    </>
  );
}

export default LoginForm;
