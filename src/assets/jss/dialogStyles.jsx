// Add Button Dialog Styles
import { primaryColor } from "./mainStyle";

const dialogStyles = theme => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  avatar: {
    margin: "auto",
    height: "150px",
    width: "150px",
    borderRadius: "100%"
  },
  dialogTitle: {
    backgroundColor: primaryColor,
    color: "#fff",
    fontSize: "20px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    maxWidth: "250px",
    width: "100%"
  },
  textFieldFullWidth: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    maxWidth: "530px",
    width: "100%"
  },
  textFieldDate: {
    marginTop: "16px",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    maxWidth: "250px",
    width: "100%"
  },
  selectFormControl: {
    marginTop: "16px",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    maxWidth: "250px",
    width: "100%"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  container: {
    width: "100%"
  }
});

export default dialogStyles;
