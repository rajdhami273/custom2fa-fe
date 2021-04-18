import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
// import css from "./Login.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import https from "../../services/https";
import Input from "../../components/Input/Input";
import { AppContext } from "../../AppProvider";

export default function Login() {
  const { getUserDetailsFromServer } = useContext(AppContext);
  const history = useHistory();
  const goToHome = () => history.push("/home");
  const goToRegister = () => history.push("/register");
  const goToPage2FACode = () => history.push("/page-2fa-code");

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().label("Email").required("Email required"), //Yup.string().required("Username or email required"),
    password: Yup.string()
      .label("Password")
      .required("Password required")
      .min(4, "Minimum length should be 4"),
    // rememberMe: Yup.boolean().label("rememberMe")
    // .checkboxChecked("")
  });
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState(false);
  const login = async (values) => {
    setLoggingIn(true);
    try {
      const res = await https.post("/user/login", {
        ...values,
      });
      if (res.data) {
        console.log(res.data);
        localStorage.setItem("authToken", res.data.payload.token);
        if (res.data.payload) {
          // getUserDetailsFromServer();
          // goToPage2FACode();
          generateCode();
        } else {
          goToRegister();
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
    setLoggingIn(true);
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
  return (
    <div className="row justify-content-center align-items-center vh-100">
      <div className="col-md-6 contents">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="mb-4">
              <h3>Sign In</h3>
              <p className="mb-4"></p>
            </div>
            <Formik
              // enableReinitialize
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginValidationSchema}
              onSubmit={(values) => {
                login(values);
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
                      label="Email"
                      placeholder="Enter email"
                      value={values.email || initialValues.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      error={touched.email && errors.email}
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter password"
                      value={values.password || initialValues.password}
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                      error={touched.password && errors.password}
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
                      Log In
                    </button>
                    <button
                      type="button"
                      onClick={goToRegister}
                      className="btn text-white btn-block btn-primary"
                    >
                      Register
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
