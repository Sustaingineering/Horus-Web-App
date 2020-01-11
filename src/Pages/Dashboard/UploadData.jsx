import React from "react";
import PropTypes from "prop-types";

import Papa from "papaparse";
import { apply, compose, lift, splitAt, zipObj } from "ramda";

class UploadData extends React.Component {
  sendData = data => {
    const timestamp = Date.now();
    this.props.firebase
      .database()
      .ref(this.props.sensorId + "/" + timestamp)
      .set(data);
  };

  handleFile = event => {
    const file = event.target.files[0];
    const onDataUploaded = this.props.onDataUploaded;
    const onError = this.props.onError;
    const sendData = this.sendData;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      error: function(err, file, inputElem, reason) {
        onError({ err, file, inputElem, reason });
      },
      step: row => {
        if (row.errors.length === 0) {
          console.log(row);
          sendData(row.data);
        }
      },
      complete: function(results) {
        onDataUploaded("Data has been uploaded to Firebase!");
      }
    });
  };

  render() {
    return this.props.render(this.handleFile);
  }
}

UploadData.propTypes = {
  onDataUploaded: PropTypes.func.isRequired,
  onError: PropTypes.func
};

export default UploadData;
