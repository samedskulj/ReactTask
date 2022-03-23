import React from "react";
import Component from "./Component";
import General from "./General";
import { BrowserRouter as Router } from "react-router-dom";

const Routing = () => {
  return (
    <>
      <Router>
        <General />
        <Component />
      </Router>
    </>
  );
};

export default Routing;
