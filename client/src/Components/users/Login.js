import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/AuthSlice";
import "./../styles/login.css";
import axiosInstance from "../../utils/axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/login", {
          email: values.email,
          password: values.password,
        });

        localStorage.setItem("jwt", JSON.stringify(response.data));
        dispatch(userLogin(response.data));
        navigate("/home");
      } catch (error) {
        console.error("Error during user login:", error);
        setErrorMessage("Invalid email or password");
      }
    },
  });

  return (
    <div className="div">
      <h2 className="loginh2">Login</h2>
      <form className="loginform" onSubmit={formik.handleSubmit}>
        <label className="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`login-input ${
            formik.touched.email && formik.errors.email ? "error" : ""
          }`}
        />

        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`login-input ${
            formik.touched.password && formik.errors.password ? "error" : ""
          }`}
        />

        {formik.touched.email && formik.errors.email && (
          <p className="error-message">{formik.errors.email}</p>
        )}

        {formik.touched.password && formik.errors.password && (
          <p className="error-message">{formik.errors.password}</p>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button className="login" type="submit">
          Login
        </button>

        <Link to={"/signup"} className="linkstyle">
          Signup
        </Link>
      </form>
    </div>
  );
}

export default Login;
