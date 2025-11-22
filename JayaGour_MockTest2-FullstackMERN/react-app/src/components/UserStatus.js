import React, { Component } from "react";
import PropTypes from "prop-types";

class UserStatus extends Component {
  constructor(props) {
    super(props);
    this.state = { status: "Fetching user status..." };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ status: "Active User" });
    }, 2000);
  }

  render() {
    return (
      <div style={{ padding: 20, backgroundColor: "#e3f2fd" }}>
        <p>User ID: {this.props.userId}</p>
        <p>Status: {this.state.status}</p>
      </div>
    );
  }
}

UserStatus.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserStatus;
