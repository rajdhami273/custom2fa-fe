import React from "react";
import {
  Route,
  BrowserRouter,
  Switch,
  useRouteMatch,
  useLocation,
  Redirect,
} from "react-router-dom";

export const Router = BrowserRouter;
const ProtectedRoutes = ({
  state,
  pathname,
  component,
  isProtected,
  ...props
}) => {
  // console.log("================> ", pathname, props);
  //   if (isProtected && !localStorage.getItem("authToken")) {
  //     return <Redirect to="/login" props={props} />;
  //   }
  return <Route component={component} props={props} />;
};

function MainRouteSwitch({ routes }) {
  const { path: p } = useRouteMatch();
  const { pathname, state } = useLocation();
  return (
    <Switch>
      {routes.map((item, index) => {
        const { exact, path, component, isProtected } = item;
        return (
          <Route
            key={index}
            path={(p === "/" ? "/" : path + "/") + path}
            exact={exact}
          >
            <ProtectedRoutes
              state={state}
              pathname={pathname}
              component={component}
              isProtected={isProtected}
            />
          </Route>
        );
      })}
    </Switch>
  );
}

export default MainRouteSwitch;
