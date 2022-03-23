import React from "react";
import { Route } from "react-router-dom";

const RouteMapper = ({ routes }) => {
  return (
    <>
      {routes?.map((route, index) => (
        <Route
          path={route.path}
          element={route.component}
          exact={route.exact}
          key={index}
        />
      ))}
    </>
  );
};

export default RouteMapper;
