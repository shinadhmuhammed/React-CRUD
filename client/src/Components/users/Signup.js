import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

import "./../styles/signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [signupSuccess, setSignUpSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .matches(/^[^\s]+$/, "Name should not contain spaces"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      age: Yup.number().required("Age is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance.post("/signup", values);
        setSignUpSuccess(true);
      } catch (err) {
        console.error("Error during user registration:", err);
      }
    },
  });

  useEffect(() => {
    if (signupSuccess) {
      const timeoutId = setTimeout(() => {
        setSignUpSuccess(false);
        navigate("/");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [signupSuccess, navigate]);

  

  return (
    <div className="body">
      <div className="loginform">
        <h2 className="loginh2">Sign up</h2>
        {signupSuccess && (
          <div className="success-message">
            Signup successful! Please login.
          </div>
        )}
        <form className="loginform" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={formik.values.name}
            className="input"
            onChange={formik.handleChange("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error-message">{formik.errors.name}</div>
          ) : null}
          <input
            type="email"
            placeholder="mail@gmail.com"
            value={formik.values.email}
            className="input"
            onChange={formik.handleChange("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
          <input
            type="text"
            placeholder="Enter your age"
            value={formik.values.age}
            className="input"
            onChange={formik.handleChange("age")}
          />
          {formik.touched.age && formik.errors.age ? (
            <div className="error-message">{formik.errors.age}</div>
          ) : null}
          <input
            type="password"
            placeholder="Enter your password"
            value={formik.values.password}
            className="input"
            onChange={formik.handleChange("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
          <button type="submit" className="login">
            Sign up
          </button>
        </form>
        <div className="pt-2 text-center text-gray-400 text-xs">
          <span>
            <span className="copyright-message">
              {`Already have an account? `}
              <Link className="linkstyle" to="/">
                Sign In
              </Link>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
