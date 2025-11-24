import React from "react";

export default function withLoader(Component) {
  return function Wrapper({ loading, ...props }) {
    if (loading) return <p>Loading...</p>;
    return <Component {...props} />;
  };
}
