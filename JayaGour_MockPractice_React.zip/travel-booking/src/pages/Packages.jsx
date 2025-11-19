import React, { useEffect, useState } from "react";
import "./Packages.css";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/packages")
      .then(res => res.json())
      .then(data => setPackages(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h3 className="text-center">Loading...</h3>;

  return (
    <section className="container">
      <h2 className="text-center mb-4">Available Travel Packages</h2>

      <div className="package-grid">
        {packages.map(pkg => (
          <div className="pkg-card" key={pkg.id}>
            <img src={pkg.image} alt={pkg.title} />
            <h3>{pkg.title}</h3>
            <p>{pkg.description}</p>

            <div className="info">
              <span>{pkg.days} days</span>
              <span>${pkg.price}</span>
            </div>

            <button className="btn-primary-custom">Book Now</button>
          </div>
        ))}
      </div>
    </section>
  );
}
