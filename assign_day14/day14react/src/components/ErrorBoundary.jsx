import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err, info) {
    console.error("Error caught:", err, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger mt-3">
          <h4>Something went wrong.</h4>
        </div>
      );
    }
    return this.props.children;
  }
}
