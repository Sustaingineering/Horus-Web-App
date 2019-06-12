// NavbarMenu Styles

import { drawerWidth, primaryColor } from '../../assets/jss/mainStyle';

const navbarmenuStyle = theme => ({
  sidebar: {},
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: primaryColor,
    position: 'fixed'
    // top: 30  // with titlebar
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7
  },
  toolbar: {
    backgroundColor: primaryColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  chevron: {
    color: 'white'
  },
  listItems: {
    backgroundColor: primaryColor,
    color: 'white',
    "&::hover" : {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  },
  sidebarDivider: {
    // position: "absolute",
    // bottom: 100,
    color: 'white',
    backgroundColor: 'white',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

export default navbarmenuStyle
