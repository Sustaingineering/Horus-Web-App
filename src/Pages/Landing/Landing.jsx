import React, { PureComponent } from "react";
import { Paper, Button, Typography } from "@material-ui/core";
import logos from "../../assets/images/logos.png";
import { Link } from "react-router-dom";

class LandingPage extends PureComponent {
  render() {

    return (
      <div>
        <Paper elevation={1}>
          <div>
            <img src={logos} alt="logos" />
          </div>
        </Paper>
        <div>
          <Paper elevation={1}>
            <Typography variant="h5">
              Horus Monitoring
            </Typography>
            <form>
              <Link to="/login">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  SIGN IN
                </Button>
              </Link>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

export default LandingPage;
