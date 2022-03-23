import React from "react";
import { Routes, Route } from "react-router-dom";
import RouteLayout from "../helper/RouteLayout";
import { generalRoutes } from "./routesdata/general-routes";

const General = () => {
  return (
    <>
      <Routes>
        {generalRoutes?.map((route, index) => {
          return (
            <Route
              exact={route.exact}
              element={<RouteLayout route={route} />}
              path={route.path}
              key={index}
            />
          );
        })}
      </Routes>
    </>
  );
};

export default General;
