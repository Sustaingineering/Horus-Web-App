import React, { PureComponent } from "react";
import { CloudUploadIcon } from "@heroicons/react/outline";

import Papa from "papaparse";

class UploadData extends PureComponent {
  constructor(props) {
    super(props);
    this.rows = [];
    this.state = {
      snack: undefined,
      
    };
  }

  sendData = (allData) => {
    return new Promise((resolve, reject) => {
      let promises = allData.map((data) =>
        this.props.firebase
          .database()
          .ref(this.props.sensorId + "/" + data["time-stamp"].toString())
          .set(data)
      );
      Promise.all(promises)
        .then((done) => resolve("Data uploaded to Firebase!"))
        .catch((error) => reject(error.message));
    });
  };

  handleResult = (result) => {
    document.getElementById("upload-file").value = "";
    this.rows = [];
    this.setState({
      snack: result,
    });
  };

  closeSnack = () => {
    this.setState({
      snack: undefined,
    });
  };

  handleFile = (event) => {
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
            this.rows.push(row.data);
          } else {
            parser.abort();
          }
        },
        complete: (results) => {
          if (results.meta.aborted) {
            this.handleResult("File or data was malformed!");
          } else {
            this.sendData(this.rows.slice())
              .then((msg) => {
                this.handleResult(msg);
              })
              .catch((msg) => this.handleResult(msg));
          }
        },
      });
    } else {
      this.handleResult("Select a file!");
    }
  };

  render() {
    return (
      <div>
        <div>
          <div>
            {/* <p variant="h6" color="primary" gutterBottom>
              Upload your CSV file
            </p> */}
            {/* <div
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={this.state.snack !== undefined}
              autoHideDuration={4000}
              onClose={this.closeSnack}
              message={<span>{this.state.snack}</span>}
            /> */}
            <div className="flex w-full items-center justify-center bg-grey-lighter">
              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-primary hover:text-white">
                <CloudUploadIcon className="h-6 w-6" />
                <span className="mt-2 text-base leading-normal">
                  Select a file
                </span>
                <input
                  onChange={(e) => console.log(e)}
                  id="upload-file"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
            {/* <button onClick={this.handleFile}> // TODO fix this state
              Upload
            </button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default UploadData;
