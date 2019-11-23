// Dashboard Styles
import { primaryColor } from '../../assets/jss/mainStyle';

const dashboardStyle = theme => ({
  root: {
    flexGrow: 1,
    // marginLeft: '100px',
    // marginRight: '30px',
    paddingTop: 15
  },
  select: {
    color: "white",
    border: '1px solid bottom white !important',
    borderBottomColor: "white",
    borderColor: "white",
    fill: "white"
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: primaryColor
  },
  tabs: {
    borderBottom: '1px solid #e8e8e8'
  },
  tab: {
    color: 'white',
    '&:hover': {
      color: 'white',
      opacity: 1
    }
  },
  '.MuiSelect-root': {
    fontSize: 100,
    border: '1px solid white',
  },
})

export default dashboardStyle;
