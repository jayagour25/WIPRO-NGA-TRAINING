import React from "react";
import withWindowWidth from "./withWindowWidth";

const ResponsiveBox = ({ windowWidth }) => {
  return (
    <div>
      <h2>Window Width: {windowWidth}px</h2>

      <div
        style={{
          width: windowWidth < 600 ? "200px" : "400px",
          height: "100px",
          backgroundColor: "lightcoral",
        }}
      ></div>
    </div>
  );
};

export default withWindowWidth(ResponsiveBox);
