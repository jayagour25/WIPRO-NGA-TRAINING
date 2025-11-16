import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function PackageItem({ p }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100">
        <img src={p.image} alt={p.title} className="card-img-top" />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{p.title}</h5>
          <p className="card-text">{p.description}</p>
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <span className="badge text-bg-primary">${p.price}</span>
            <span className="badge text-bg-success">{p.days} days</span>
            <span className="badge text-bg-warning"> {p.rating}</span>
          </div>
          <Link to={`/booking/${p.id}`} className="btn btn-outline-primary mt-3">Book Now</Link>
        </div>
      </div>
    </div>
  );
}

PackageItem.propTypes = { p: PropTypes.object.isRequired };

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:4000/packages');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPackages(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center">Loading packages...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2 className="mb-4 text-center">Travel Packages</h2>
      <div className="row g-4">
        {packages.map((p) => <PackageItem key={p.id} p={p} />)}
      </div>
    </div>
  );
}
