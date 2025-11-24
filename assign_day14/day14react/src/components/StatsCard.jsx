import React from "react";

function StatsCard({ title, value, lastUpdated }) {
  console.log("Rendering:", title);

  return (
    <div className="card p-3 m-2" style={{ minWidth: 200 }}>
      <h4>{title}</h4>
      <p className="fs-4 fw-bold">{value}</p>
      <small className="text-muted">Last updated: {lastUpdated}</small>
    </div>
  );
}

export default React.memo(StatsCard);
