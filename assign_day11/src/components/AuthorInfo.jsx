import React, { Component } from 'react';

class AuthorInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authorData: {}
    };
  }

  // ✅ Lifecycle method demonstration
  componentDidMount() {
    console.log('AuthorInfo componentDidMount: Simulating data load...');
    setTimeout(() => {
      this.setState({
        loading: false,
        authorData: {
          bio: `${this.props.author} is a celebrated writer known for captivating storytelling.`,
          topBooks: ['Book A', 'Book B', 'Book C']
        }
      });
    }, 1000);
  }

  render() {
    const { author } = this.props;
    const { loading, authorData } = this.state;

    if (loading) return <p>Loading author details...</p>;

    return (
      <div className="card p-3 mt-3">
        <h4>Author: {author}</h4>
        <p>{authorData.bio}</p>
        <h6>Top 3 Books:</h6>
        <ul>
          {authorData.topBooks.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AuthorInfo;
