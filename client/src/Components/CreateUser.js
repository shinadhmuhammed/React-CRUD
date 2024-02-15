import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import "./styles/Createuser.css";

function CreateUser() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .test("no-spaces", "Name should not contain spaces", (value) => {
        return value && !/\s/.test(value);
      }),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    age: yup
      .number()
      .required("Age is required")
      .positive("Age must be a positive number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const token = JSON.parse(localStorage.getItem("jwt"));
      try {
        const res = await axiosInstance.post(
          "adminlogin/addUser",
          {
            name: values.name,
            email: values.email,
            age: values.age,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/admin");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="container mt-5">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${
              formik.touched.name && formik.errors.name ? "is-invalid" : ""
            }`}
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter name"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="invalid-feedback">{formik.errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${
              formik.touched.email && formik.errors.email ? "is-invalid" : ""
            }`}
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className={`form-control ${
              formik.touched.age && formik.errors.age ? "is-invalid" : ""
            }`}
            id="age"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter age"
          />
          {formik.touched.age && formik.errors.age && (
            <div className="invalid-feedback">{formik.errors.age}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
