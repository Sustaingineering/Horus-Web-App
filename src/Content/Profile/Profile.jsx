import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// Material UI Components
import {
  Grid,
  Paper,
  TextField,
  FormControl,
  MuiThemeProvider,
  Avatar,
  InputLabel,
  Select,
  Input,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
// Datepicker
import { DatePicker } from "material-ui-pickers";
//Style
import profileStyle from "./profileStyle";
import { withStyles } from "@material-ui/core/styles";
import { mainTheme } from "../../assets/jss/mainStyle";
// Profile Picture URL temp
import tempPic from "../../assets/images/profilethumb.jpg";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      birthDate: new Date(),
      department: "",
      profilePictureURL: ""
    };
  }

  componentWillMount() {}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleBirthDateChange = date => {
    this.setState({
      birthDate: date
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.root}>
          <Grid container>
            <Grid item xs sm md lg>
              <Paper className={classes.paper}>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={4} md={2}>
                    <Avatar
                      alt="User"
                      src={this.state.profilePictureURL || tempPic}
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8} md={10}>
                    <Paper className={classes.paper}>
                      <MuiThemeProvider theme={mainTheme}>
                        <Grid container spacing={16}>
                          <Grid item xs={12} sm={6} md={6}>
                            <FormControl
                              className={classes.container}
                              noValidate
                              autoComplete="off"
                            >
                              <TextField
                                id="email"
                                label="Email"
                                className={classes.textField}
                                value={this.state.email || ""}
                                onChange={this.handleChange("email")}
                                margin="normal"
                              />
                              <DatePicker
                                label="Birthdate"
                                className={classes.textFieldDate}
                                value={this.state.birthDate}
                                onChange={this.handleBirthDateChange}
                                animateYearScrolling={false}
                                format="DD/MMMM/YYYY"
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <FormControl
                              className={classes.container}
                              noValidate
                              autoComplete="off"
                            >
                              <TextField
                                id="firstName"
                                label="First Name"
                                className={classes.textField}
                                value={this.state.firstName}
                                onChange={this.handleChange("firstName")}
                                helperText="First Name"
                                margin="normal"
                              />
                              <TextField
                                id="lastName"
                                label="Last Name"
                                className={classes.textField}
                                value={this.state.lastName}
                                onChange={this.handleChange("lastName")}
                                helperText="Last Name"
                                margin="normal"
                              />
                              <TextField
                                id="number"
                                label="Telephone"
                                className={classes.textField}
                                value={this.state.number}
                                onChange={this.handleChange("number")}
                                margin="normal"
                                helperText=""
                                type="number"
                              />
                              <FormControl
                                className={classes.selectFormControl}
                              >
                                <InputLabel htmlFor="department-helper">
                                  Department
                                </InputLabel>
                                <Select
                                  value={this.state.department}
                                  onChange={this.handleChange("department")}
                                  input={
                                    <Input
                                      name="department"
                                      id="department-helper"
                                    />
                                  }
                                >
                                  <MenuItem value={this.state.department}>
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value={"SALES"}>Sales</MenuItem>
                                  <MenuItem value={"HR"}>HR</MenuItem>
                                  <MenuItem value={"IT"}>IT</MenuItem>
                                </Select>
                                <FormHelperText>
                                  Employee current department
                                </FormHelperText>
                              </FormControl>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </MuiThemeProvider>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(profileStyle)(Profile);
