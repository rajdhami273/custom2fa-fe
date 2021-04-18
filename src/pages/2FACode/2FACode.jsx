import React, { useState, useContext } from "react";
import css from "./2FACode.module.scss";
import { useHistory } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import https from "../../services/https";
import Input from "../../components/Input/Input";
import { AppContext } from "../../AppProvider";

export default function Page2FACode() {
  const { getUserDetailsFromServer } = useContext(AppContext);
  const history = useHistory();
  const goToHome = () => history.push("/home");
  const goToRegister = () => history.push("/register");

  const validationSchema = Yup.object().shape({
    code: Yup.string().label("2FA Code").required(), //Yup.string().required("Username or email required"),
  });
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState(false);
  const validateCode = async (values) => {
    setLoggingIn(true);
    try {
      const res = await https.post("/user/verify-code", {
        ...values,
      });
      if (res) {
        console.log(res);
        getUserDetailsFromServer();
        goToHome();
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
              <h3>Enter 2FA code</h3>
              <p className="mb-4"></p>
            </div>
            <Formik
              // enableReinitialize
              initialValues={{
                code: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                validateCode(values);
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
                      label="Code"
                      type="password"
                      placeholder="Enter code"
                      value={values.code || initialValues.code}
                      onChange={handleChange("code")}
                      onBlur={handleBlur("code")}
                      error={touched.code && errors.code}
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
