import React, { PureComponent } from "react";

import Papa from "papaparse";

class UploadData extends PureComponent {
  constructor(props) {
    super(props);
    this.rows = [];
    this.state = {
      snack: undefined
    };
  }

  sendData = allData => {
    return new Promise((resolve, reject) => {
      let promises = allData.map(data =>
        this.props.firebase
          .database()
          .ref(this.props.sensorId + "/" + data["time-stamp"].toString())
          .set(data)
      );
      Promise.all(promises)
        .then(done => resolve("Data uploaded to Firebase!"))
        .catch(error => reject(error.message));
    });
  };

  handleResult = result => {
    document.getElementById("upload-file").value = "";
    this.rows = [];
    this.setState({
      snack: result
    });
  };

  closeSnack = () => {
    this.setState({
      snack: undefined
    });
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
            this.rows.push(row.data);
          } else {
            parser.abort();
          }
        },
        complete: results => {
          if (results.meta.aborted) {
            this.handleResult("File or data was malformed!");
          } else {
            this.sendData(this.rows.slice())
              .then(msg => {
                this.handleResult(msg);
              })
              .catch(msg => this.handleResult(msg));
          }
        }
      });
    } else {
      this.handleResult("Select a file!");
    }
  };

  render() {
    return (
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item>
          <Paper>
            <Typography variant="h6" color="primary" gutterBottom>
              Upload your CSV file
            </Typography>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              open={this.state.snack !== undefined}
              autoHideDuration={4000}
              onClose={this.closeSnack}
              message={<span>{this.state.snack}</span>}
            />
            <Input id="upload-file" type="file" />
            <Button color="primary" onClick={this.handleFile}>
              Upload
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default UploadData;
