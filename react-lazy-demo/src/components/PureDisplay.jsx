import React, { PureComponent } from "react";

class PureDisplay extends PureComponent {
  render() {
    return (
      <div>
        <h2>Pure Component Example</h2>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default PureDisplay;
