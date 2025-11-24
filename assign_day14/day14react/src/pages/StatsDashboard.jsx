import React, { useState } from "react";
import StatsCard from "../components/StatsCard";

export default function StatsDashboard() {
  const [stats, setStats] = useState([
    { id: 1, title: "Active Users", value: 120, lastUpdated: new Date().toLocaleTimeString() },
    { id: 2, title: "New Signups", value: 34, lastUpdated: new Date().toLocaleTimeString() },
    { id: 3, title: "Revenue", value: "$540", lastUpdated: new Date().toLocaleTimeString() },
  ]);

  const updateFirstCard = () => {
    setStats(prev =>
      prev.map((item, i) =>
        i === 0
          ? { ...item, value: item.value + 1, lastUpdated: new Date().toLocaleTimeString() }
          : item
      )
    );
  };

  const reRenderWithoutChange = () => setStats(prev => [...prev]);

  return (
    <div className="container mt-5">
      <h2>Pure Components</h2>

      <div className="d-flex">
        {stats.map(s => (
          <StatsCard key={s.id} {...s} />
        ))}
      </div>

      <button className="btn btn-primary mt-3 me-2" onClick={updateFirstCard}>
        Update First Card
      </button>

      <button className="btn btn-outline-secondary mt-3" onClick={reRenderWithoutChange}>
        Re-render Without Changes
      </button>
    </div>
  );
}
