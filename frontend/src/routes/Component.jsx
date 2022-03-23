import React from "react";
import { Routes, Route } from "react-router-dom";
import RouteMapper from "../helper/RouteMapper";
import { componentRoutes } from "./routesdata/component-routes";

const Component = () => {
  return (
    <Routes>
      {componentRoutes?.map((route, index) => (
        <Route
          path={route.path}
          element={route.component}
          exact={route.exact}
          key={index}
        />
      ))}
    </Routes>
  );
};

export default Component;
