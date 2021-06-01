import React, { Fragment, PureComponent } from "react";
import { Container, Section } from "../Components/Basics";
import { Link } from "react-router-dom";
import { ChipIcon, PlusIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";

class Sensors extends PureComponent {
  state = {
    sensorName: "",
    sensorId: "",
    submitting: false,
    modalOpen: false,
  };

  addSensor = () => {
    // TODO do some validation to make sure we don't overwrite an existing sensor
    if (
      this.state.sensorName &&
      this.state.sensorId
      // !Object.keys(this.props.sensors).includes(this.state.sensorName) &&
      // !Object.values(this.props.sensors).includes(this.state.sensorId)
    ) {
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
                modalOpen: false,
              });
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
            <div
              className="card bg-white p-5 rounded-lg shadow-lg h-72"
              key={`sensor-${sensor}`}
            >
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
            className="btn btn-outline border-dashed bg-opacity-30 bg-white p-5 rounded-lg h-72 align-middle justify-center"
            onClick={() => this.setState({ modalOpen: true })}
          >
            <PlusIcon className="h-20 w-20" />
          </label>
        </div>
        <Transition appear show={this.state.modalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto text-center"
            open={this.state.modalOpen}
            onClose={() => this.setState({ modalOpen: false })}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add a new sensor
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    To add a sensor, give it a descriptive (unique) name, and
                    input its unique ID.
                  </p>
                </div>
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
                    className={clsx(
                      "btn",
                      this.state.submitting ? "btn-disabled" : ""
                    )}
                    onClick={() =>
                      this.setState({
                        sensorName: "",
                        sensorId: "",
                        modalOpen: false,
                      })
                    }
                  >
                    Cancel
                  </label>
                  <label
                    className={clsx(
                      "btn",
                      this.state.submitting
                        ? "btn-disabled loading"
                        : "btn-primary"
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
            </Transition.Child>
          </Dialog>
        </Transition>
      </Container>
    );
  }
}

export default Sensors;
