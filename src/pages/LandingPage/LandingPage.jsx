import React from "react";
import { useHistory } from "react-router";
import css from "./LandingPage.module.scss";

const LandingPage = (props) => {
  const history = useHistory();
  const goToLogin = () => history.push("/login");
  const goToRegister = () => history.push("/register");

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className="row vh-md-100">
          <div className="col-md-8 col-sm-10 col-12 mx-auto my-auto text-center">
            <h1 className={css.headingBlack + " " + css.textCapitalize}>
              Custom 2FA
            </h1>
            <p className={css.lead + " py-3"}>
              This project is made to create a Custom 2FA from scratch for
              college project and future products with more improvements!
            </p>
            <div className="d-flex justify-content-around">
              <button
                className="btn btn-primary d-inline-flex flex-row align-items-center"
                onClick={goToLogin}
              >
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-arrow-right ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              <button
                className="btn btn-primary d-inline-flex flex-row align-items-center"
                onClick={goToRegister}
              >
                Register
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-arrow-right ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
