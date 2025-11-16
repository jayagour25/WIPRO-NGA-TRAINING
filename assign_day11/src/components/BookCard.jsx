import React from 'react';
import PropTypes from 'prop-types';

const BookCard = ({ book, onSelect }) => {
  return (
    <div className="card m-2 shadow-sm" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text text-muted">{book.genre}</p>
        <button className="btn btn-primary" onClick={() => onSelect(book.author)}>
          View Author
        </button>
      </div>
    </div>
  );
};

// ✅ PropTypes validation
BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default BookCard;
