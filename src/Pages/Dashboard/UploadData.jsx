import React from "react";
import { Typography, Input, Button } from "@material-ui/core";
import Papa from "papaparse";
import { withStyles } from "@material-ui/core/styles";

const style = {
  input: {
    color: "white"
  }
};

class UploadData extends React.Component {
  sendData = data => {
    this.props.firebase
      .database()
      .ref(this.props.sensorId + "/" + data["time-stamp"].toString())
      .set(data);
  };

  handleResult = result => {
    const msg = document.getElementById("message-box");
    msg.innerHTML = result;
    setTimeout(() => {
      msg.innerHTML = "";
    }, 5000);
  };

  handleFile = event => {
    const elem = document.getElementById("upload-file");
    const file = elem.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        error: (err, file, inputElem, reason) => {
          this.handleResult("Parsing error!");
        },
        step: (row, parser) => {
          if (row.errors.length === 0 && row.data["time-stamp"]) {
            this.sendData(row.data);
          } else {
            parser.abort();
          }
        },
        complete: results => {
          elem.value = "";
          if (results.meta.aborted) {
            this.handleResult("File or data was malformed!");
          } else {
            this.handleResult("Data has been uploaded to Firebase!");
          }
        }
      });
    } else {
      this.handleResult("Select a file!");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Input className={classes.input} id="upload-file" type="file" />
        <Button color="primary" onClick={this.handleFile}>
          Upload
        </Button>
        <Typography
          id="message-box"
          color="primary"
          variant="subtitle2"
        ></Typography>
      </div>
    );
  }
}

export default withStyles(style)(UploadData);
