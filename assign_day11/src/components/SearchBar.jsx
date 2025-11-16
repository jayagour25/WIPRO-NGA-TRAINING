import React, { Component, createRef } from 'react';

class SearchBar extends Component {
  constructor() {
    super();
    this.inputRef = createRef();
  }

  focusInput = () => {
    this.inputRef.current.focus();
  };

  render() {
    return (
      <div className="my-3 text-center">
        <input
          type="text"
          placeholder="Search book..."
          ref={this.inputRef}
          className="form-control w-50 d-inline"
        />
        <button onClick={this.focusInput} className="btn btn-success ms-2">
          Focus Input
        </button>
      </div>
    );
  }
}

export default SearchBar;
