import React, { Component } from 'react';
import BookList from './components/BookList';
import AuthorInfo from './components/AuthorInfo';
import SearchBar from './components/SearchBar';

class App extends Component {
  state = {
    books: [
      { title: 'The Dreaming Earth', genre: 'Sci-Fi', author: 'Arthur C. Clarke' },
      { title: 'Mystic River', genre: 'Thriller', author: 'Dennis Lehane' },
      { title: 'The Blue Castle', genre: 'Romance', author: 'L. M. Montgomery' }
    ],
    selectedAuthor: null
  };

  handleSelect = (author) => {
    this.setState({ selectedAuthor: author });
  };

  render() {
    const { books, selectedAuthor } = this.state;

    return (
      <div className="container py-4">
        <h2 className="text-center mb-4">📚 BookVerse</h2>

        {/* Refs demonstration */}
        <SearchBar />

        {/* List of books */}
        <BookList books={books} onSelect={this.handleSelect} />

        {/* Show Author Info when selected */}
        {selectedAuthor && <AuthorInfo author={selectedAuthor} />}
      </div>
    );
  }
}

export default App;
