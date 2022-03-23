import React from "react";
import { Routes, Route } from "react-router-dom";
import RouteMapper from "../helper/RouteMapper";
import Layout from "../layout/Layout";
import { generalRoutes } from "./routesdata/general-routes";

const General = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {generalRoutes?.map((route, index) => (
            <Route
              path={route.path}
              element={route.component}
              exact={route.exact}
              key={index}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default General;
