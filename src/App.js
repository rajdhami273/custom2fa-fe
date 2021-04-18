import "./App.scss";
import AppProvider from "./AppProvider";
import MainRouteSwitch, { Router } from "./core/routes/router";
import { MainRoutes } from "./core/routes/mainRoutes";

function App() {
  return (
    <AppProvider>
      <Router>
        <MainRouteSwitch routes={MainRoutes} />
      </Router>
    </AppProvider>
  );
}

export default App;
