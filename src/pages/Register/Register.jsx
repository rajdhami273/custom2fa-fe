import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
// import css from "./Login.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import https from "../../services/https";
import Input from "../../components/Input/Input";
import { AppContext } from "../../AppProvider";

export default function Register() {
  const context = useContext(AppContext);
  const history = useHistory();
  const goToHome = () => history.push("/home");
  const goToPage2FACode = () => history.push("/page-2fa-code");

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().nullable().label("First name").required(),
    lastName: Yup.string().nullable().label("Last name"),
    mobile: Yup.string()
      .nullable()
      .label("Mobile number")
      .required()
      .min(10, "Minimum length should be 10")
      .max(10, "Maximum length should be 10"),
    email: Yup.string().nullable().label("Email").required().email(),
    password: Yup.string()
      .nullable()
      .label("Password")
      .min(4, "Minimum length should be 4")
      .required(),
    confirmPassword: Yup.string()
      .nullable()
      .label("Confirm password")
      .required()
      .min(4, "Minimum length should be 4")
      .oneOf(
        [Yup.ref("password")],
        "Password and Confirm password do not match"
      ),
  });
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState(false);
  const register = async (values) => {
    setLoggingIn(true);
    try {
      const res = await https.post("/user/register", {
        ...values,
      });
      if (res.data) {
        console.log(res.data);
        localStorage.setItem("authToken", res.data.payload.token);
        if (res.data.payload) {
          // goToPage2FACode();
          generateCode();
        } else {
          // history.push("/register");
        }
      }
    } catch (error) {
      if (error.response) {
        // setErrorMessage(error.response.data.message);
        setError(error.response.data.message);
      } else {
        // setErrorMessage(error.message);
        setError(error.message);
      }
      // toggleErrorPopup();
    } finally {
      setLoggingIn(false);
    }
  };
  const generateCode = async (values) => {
    // setLoggingIn(true);
    try {
      const res = await https.post("/user/generate-code", {
        ...values,
      });
      if (res.data) {
        goToPage2FACode();
        // console.log(res.data);
        // localStorage.setItem("authToken", res.data.payload.token);
        // if (res.data.payload) {
        //   getUserDetailsFromServer();
        //   goToHome();
        // } else {
        //   goToRegister();
        // }
      }
    } catch (error) {
      if (error.response) {
        // setErrorMessage(error.response.data.message);
        // setError(error.response.data.message);
      } else {
        // setErrorMessage(error.message);
        // setError(error.message);
      }
      // toggleErrorPopup();
    } finally {
      // setLoggingIn(false);
    }
  };
  return (
    <div className="row justify-content-center align-items-center vh-100">
      <div className="col-md-6 contents">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="mb-4">
              <h3>Sign up</h3>
              <p className="mb-4"></p>
            </div>
            <Formik
              enableReinitialize
              validateOnBlur={true}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                mobile: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                register(values);
              }}
            >
              {(formik) => {
                const {
                  initialValues,
                  values,
                  handleBlur,
                  handleChange,
                  errors,
                  touched,
                  handleSubmit,
                } = formik;
                return (
                  <form>
                    <Input
                      label={"First name*"}
                      type={"text"}
                      placeholder={"Enter your first name"}
                      value={values.firstName || initialValues.firstName}
                      onChange={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      disabled={false}
                      error={touched.firstName && errors.firstName}
                      required={true}
                    />
                    <Input
                      label={"Last name"}
                      type={"text"}
                      placeholder={"Enter last name"}
                      value={values.lastName || initialValues.lastName}
                      onChange={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      disabled={false}
                      error={touched.lastName && errors.lastName}
                      required={true}
                    />
                    <Input
                      label="Email*"
                      type="email"
                      placeholder="Enter email"
                      value={values.email || initialValues.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      error={touched.email && errors.email}
                      required={true}
                    />
                    <Input
                      label="Mobile*"
                      type="text"
                      placeholder="Enter mobile number (10 digits)"
                      value={values.mobile || initialValues.mobile}
                      onChange={handleChange("mobile")}
                      onBlur={handleBlur("mobile")}
                      error={touched.mobile && errors.mobile}
                      required={true}
                    />
                    <Input
                      label="Password*"
                      type="password"
                      placeholder="Enter password"
                      value={values.password || initialValues.password}
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                      error={touched.password && errors.password}
                      required={true}
                    />
                    <Input
                      label={"Confirm Password*"}
                      type={"password"}
                      placeholder={"Confirm Password"}
                      value={
                        values.confirmPassword || initialValues.confirmPassword
                      }
                      onChange={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      disabled={false}
                      error={touched.confirmPassword && errors.confirmPassword}
                      required={true}
                    />
                    <div className="invalid-feedback">{error}</div>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn text-white btn-block btn-primary"
                    >
                      {loggingIn ? (
                        <span
                          className="spinner-border spinner-border-sm mr-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : null}
                      Sign up
                    </button>
                    {/* <span className="d-block text-left my-4 text-muted">
                {" "}
                or sign in with
              </span>
              <div className="social-login">
                <a href="#" className="facebook">
                  <span className="icon-facebook mr-3"></span>
                </a>
                <a href="#" className="twitter">
                  <span className="icon-twitter mr-3"></span>
                </a>
                <a href="#" className="google">
                  <span className="icon-google mr-3"></span>
                </a>
              </div> */}
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
