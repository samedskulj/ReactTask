import React from "react";
import Layout from "../layout/Layout";
import RequireAuth from "./RequireAuth";
const RouteLayout = ({ route }) => {
  if (route.auth && route.layout) {
    return (
      <Layout>
        <RequireAuth>{route.component}</RequireAuth>
      </Layout>
    );
  } else if (route.auth && !route.layout) {
    return <RequireAuth>{route.component}</RequireAuth>;
  } else if (!route.auth && route.layout) {
    return <Layout>{route.component}</Layout>;
  } else {
    return route.component;
  }
};

export default RouteLayout;
