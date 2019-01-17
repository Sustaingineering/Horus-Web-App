// Styles
import bg from '../../assets/images/bg.jpg';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    paddingTop: 90,
    paddingBottom: 50,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  mainFeaturedPost: {
    backgroundImage: 'url(' + bg + ')',
    backgroundColor: '#27293d',
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0
    }
  },
  card: {
    backgroundColor: '#27293d',
    display: 'flex',
    color: 'white'
  },
  cardDetails: {
    flex: 1
  },
  postLink: {
    margin: 15,
    fontWeight: 700
  },
  postText: {
    margin: 15,
    fontWeight: 500
  },
  cardMedia: {
    width: 160
  },
  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200]
  },
  footer: {},
  logos: {
    marginTop: '2%',
    marginLeft: 'calc(50% - 350px)',
    width: 650,
    height: 'auto'
  }
})

export default styles
