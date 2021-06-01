import React, { PureComponent } from "react";
import { Container } from "../Components/Basics";
import logos from "../assets/images/logos.png";
import { Link } from "react-router-dom";

class Sensors extends PureComponent {
  render() {
    return (
      <div className="mt-20">
        <Container>
          <div className="card text-center shadow-2xl">
            <img className="mx-auto" src={logos} alt="logos" />
            <div className="card-body">
              <p className="text-lg">Horus Monitoring</p>
              <div className="card-actions justify-center">
                <Link to="/login">
                  <button className="btn btn-outline btn-accent">
                    SIGN IN
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Sensors;
