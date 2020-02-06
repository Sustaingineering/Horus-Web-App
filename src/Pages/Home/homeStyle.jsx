// Styles
import bg from "../../assets/images/bg.jpg";

const styles = theme => ({
  layout: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3) / 2
    },
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(3)
    }
  },
  mainFeaturedPost: {
    backgroundImage: "url(" + bg + ")",
    backgroundColor: "#27293d",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4)
  },
  mainFeaturedPostContent: {
    height: "100%",
    width: "auto",
    padding: `${theme.spacing(6)}px`,
    [theme.breakpoints.up("md")]: {
      paddingRight: 0
    }
  },
  card: {
    backgroundColor: "#27293d",
    display: "flex",
    color: "white"
  },
  cardDetails: {
    flex: 1
  },
  postTitle: {
    margin: 15,
    fontWeight: 700
  },
  postText: {
    margin: 15,
    lineHeight: 1.5
  },
  cardMedia: {
    width: 160
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  logos: {
    marginTop: "2%",
    marginLeft: "calc(50% - 350px)",
    width: 650,
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "calc(50% - 250px)",
      width: 450
    },
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
});

export default styles;
