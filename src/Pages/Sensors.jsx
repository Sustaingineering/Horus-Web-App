import React, { PureComponent } from "react";
import { Container, Section } from "../Components/Basics";
import logos from "../assets/images/logos.png";
import { Link } from "react-router-dom";
import { ChipIcon, PlusIcon } from "@heroicons/react/outline";
import clsx from "clsx";

class Sensors extends PureComponent {
  modalRef = React.createRef();
  state = {
    sensorName: "",
    sensorId: "",
    submitting: false,
  };

  addSensor = () => {
    // TODO do some validation to make sure we don't overwrite an existing sensor
    if (this.state.sensorName && this.state.sensorId) {
      this.setState(
        {
          submitting: true,
        },
        () => {
          let db = this.props.firebase.firestore();
          let uid = this.props.firebase.auth().currentUser.uid;
          let add = { sensors: {} };
          add.sensors[this.state.sensorName] = this.state.sensorId;
          db.collection("users")
            .doc(uid)
            .set(add, { merge: true })
            .then(() => {
              this.setState({
                sensorName: "",
                sensorId: "",
                submitting: false,
              });
              if (this.modalRef.current) {
                this.modalRef.current.checked = false;
              }
            });
        }
      );
    }
  };

  deleteSensor = (sensor) => {
    let db = this.props.firebase.firestore();
    let uid = this.props.firebase.auth().currentUser.uid;
    let remove = {
      ["sensors." + sensor]: this.props.firebase.firestore.FieldValue.delete(),
    };
    db.collection("users").doc(uid).update(remove);
  };

  componentDidMount = () => {
    this.props.setPath("sensors");
  };

  render() {
    return (
      <Container>
        <Section text="Sensors" subText="Add, edit, and remove sensors here" />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full gap-6">
          {Object.keys(this.props.sensors).map((sensor) => (
            <div className="card bg-white p-5 rounded-lg shadow-lg h-72" key={`sensor-${sensor}`}>
              {/* <span className="w-screen"></span> */}
              <div className="card-title h-full">
                <ChipIcon className="block h-8 w-8 -ml-1 mr-2 mb-2" />
                {sensor}
                <p className="font-extralight text-sm whitespace-nowrap">{`ID: ${this.props.sensors[sensor]}`}</p>
              </div>
              <div className="card-actions">
                <Link to={`/sensors/${sensor}`}>
                  <button className="btn">View</button>
                </Link>
                {/* <button className="btn btn-info">Edit</button> */}
                <button
                  className="btn btn-error"
                  onClick={() => {
                    if (window.confirm("Are you sure?")) {
                      this.deleteSensor(sensor);
                    }
                  }}
                >
                  Delete
                </button>
                {/* Add view, edit and delete buttons */}
              </div>
            </div>
          ))}
          <label
            htmlFor="my-modal-2"
            className="btn btn-outline border-dashed bg-opacity-30 bg-white p-5 rounded-lg h-72 modal-button align-middle justify-center"
          >
            <PlusIcon className="h-20 w-20" />
          </label>
        </div>

        <input
          ref={this.modalRef}
          type="checkbox"
          id="my-modal-2"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <p>
              To add a sensor, give it a descriptive (unique) name, and input
              its unique ID.
            </p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Unique Sensor Name</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full pr-16 input input-bordered"
                  value={this.state.sensorName}
                  onChange={(val) =>
                    this.setState({ sensorName: val.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Unique Sensor ID</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ID"
                  className="w-full pr-16 input input-bordered"
                  value={this.state.sensorId}
                  onChange={(val) =>
                    this.setState({ sensorId: val.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-action">
              <label
                htmlFor="my-modal-2"
                className={clsx(
                  "btn",
                  this.state.submitting ? "btn-disabled" : ""
                )}
                onClick={() => this.setState({ sensorName: "", sensorId: "" })}
              >
                Cancel
              </label>
              <label
                htmlFor="my-modal-2"
                className={clsx(
                  "btn",
                  this.state.submitting ? "btn-disabled loading" : "btn-primary"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  this.addSensor();
                }}
              >
                {this.state.submitting ? "  " : "Add"}
              </label>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default Sensors;
