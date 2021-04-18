import Page2FACode from "../../pages/2FACode/2FACode";
import Home from "../../pages/Home/Home";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";

export const MainRoutes = [
  //   {
  //     path: "profile-type",
  //     isProtected: false,
  //     component: (props) => <ProfileType {...props} />,
  //   },
  {
    path: "login",
    isProtected: false,
    component: (props) => <Login {...props} />,
  },
  {
    path: "register",
    isProtected: false,
    component: (props) => <Register {...props} />,
  },
  {
    path: "page-2fa-code",
    isProtected: false,
    component: (props) => <Page2FACode {...props} />,
  },
  {
    path: "home",
    isProtected: true,
    component: (props) => <Home {...props} />,
  },
  {
    path: "",
    isProtected: false,
    component: (props) => <LandingPage {...props} />,
  },
];
