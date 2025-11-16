import React from 'react';
import PropTypes from 'prop-types';

export default function DestinationCard({ title, image, onAdd, wished }) {
  return (
    <div className="card h-100 shadow-sm">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Discover {title} with curated experiences.</p>
        <button
          className={`btn ${wished ? 'btn-success' : 'btn-outline-primary'} mt-auto wishlist-btn`}
          onClick={onAdd}
        >
          {wished ? 'Added' : 'Add to Wishlist'}
        </button>
      </div>
    </div>
  );
}

DestinationCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  wished: PropTypes.bool
};
