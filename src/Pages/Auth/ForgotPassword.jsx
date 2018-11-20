import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class ForgotPassword extends Component {
  render() {
    return (
      <div>
        <Link to="/login">Go back to Login</Link>
      </div>
    );
  }
}

export default ForgotPassword;
