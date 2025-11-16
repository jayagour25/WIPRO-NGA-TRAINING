import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { advanceStatus, resetStatus } from '../store/bookingSlice';

const steps = ['created', 'processing', 'confirmed', 'ticketed'];

export default function Dashboard() {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.booking.bookingStatus);

  return (
    <div className="mx-auto" style={{maxWidth: 720}}>
      <h2>Booking Status Dashboard</h2>
      <p>Current status: <span className="badge text-bg-info text-uppercase">{status}</span></p>
      <div className="d-flex gap-2">
        <button className="btn btn-outline-primary" onClick={() => dispatch(advanceStatus())}>
          Advance
        </button>
        <button className="btn btn-outline-secondary" onClick={() => dispatch(resetStatus())}>
          Reset
        </button>
      </div>
      <ul className="list-group mt-3">
        {steps.map((s) => (
          <li key={s} className={`list-group-item d-flex justify-content-between align-items-center ${s===status?'active':''}`}>
            <span className={s===status?'text-white':''}>{s}</span>
            {s===status && <span className="badge bg-light text-dark">current</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
