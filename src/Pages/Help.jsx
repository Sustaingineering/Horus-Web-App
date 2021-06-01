import React, { PureComponent } from "react";
import { Container } from "../Components/Basics";
import logos from "../assets/images/logos.png";
import { Link } from "react-router-dom";

class Help extends PureComponent {
  render() {
    return (
      <Container>
        <div className="card max-w-6xl">
          <div className="card-body">
            <span className="w-screen"></span>
            <p className="card-title">Getting Started</p>
            <p>
              Welcome to Horus! This web app is organized in a way that makes it
              easy to check sensors.
            </p>
          </div>
        </div>
      </Container>
    );
  }
}

export default Help;
