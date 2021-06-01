import React, { PureComponent } from "react";
import { Container } from "../Components/Basics";
import logos from "../assets/images/logos.png";
import { Link } from "react-router-dom";

class LandingPage extends PureComponent {
  render() {
    return (
      <div className="mt-20">
        <Container>
          <div className="card text-center bg-white max-w-2xl m-auto shadow-xl">
            <img className="mx-auto filter invert" src={logos} alt="logos" />
            <div className="card-body">
              <p className="text-lg font-semibold subpixel-antialiased">Horus Monitoring</p>
              <div className="card-actions justify-center">
                <Link to="/login">
                  <button className="btn btn-primary">
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

export default LandingPage;
