import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onSelect }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {books.map((b, index) => (
        <BookCard key={index} book={b} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default BookList;
