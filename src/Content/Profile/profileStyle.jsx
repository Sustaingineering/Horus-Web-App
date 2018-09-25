// Profile Styles

const profileStyle = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  picHeight: {
    maxHeight: '250px',
    maxWidth: '130px',
    minHeight: '120px',
    minWidth: '100px',
    width: 'auto',
    heigh: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '100%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    maxWidth: '250px',
    width: '100%',
  },
  textFieldDate: {
    marginTop: '16px',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    maxWidth: '250px',
    width: '100%',
  },
  selectFormControl: {
    marginTop: '16px',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    maxWidth: '250px',
    width: '100%',
  },
  menu: {
    width: 200,
  },
  avatar: {
    margin: 'auto',
    height: '100%',
    width: '100%',
    maxHeight: '150px',
    maxWidth: '150px',
    borderRadius: '100%',
  },
});

export default profileStyle;

