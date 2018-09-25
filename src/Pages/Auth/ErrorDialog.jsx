import React, { Component, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
//Style
import { MuiThemeProvider } from "@material-ui/core/styles";
import { mainTheme } from "../../assets/jss/mainStyle";

class ErrorDialog extends Component {
  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={mainTheme}>
          <Dialog
            open={this.props.openDialog}
            onClose={this.props.dialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Erorr!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {this.props.error}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.dialogClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={this.props.dialogClose}
                color="primary"
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default ErrorDialog;
