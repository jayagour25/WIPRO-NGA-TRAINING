import React from "react";

const HeavyPage = () => (
  <div>
    <h2>Heavy Page</h2>
    <p>This is a lazily loaded component.</p>
    <img
      src="https://via.placeholder.com/800x400"
      alt="Placeholder"
      style={{ width: "100%", marginTop: "10px" }}
    />
  </div>
);

export default HeavyPage;
