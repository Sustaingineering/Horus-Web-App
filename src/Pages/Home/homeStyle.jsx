import { primaryColor } from "../../assets/jss/mainStyle";

const styles = theme => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3) / 2
    },
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(3)
    }
  },
  mainFeaturedPost: {
    marginBottom: theme.spacing(4)
  },
  card: {
    backgroundColor: primaryColor,
    color: "white"
  },
  postTitle: {
    margin: 12,
    fontWeight: 700
  },
  postText: {
    margin: 12,
    lineHeight: 1.8
  },
  cardMedia: {
    height: 250,
  },
  footer: {
    textAlign: "center"
  },
  logos: {
    marginTop: theme.spacing(2),
    width: "70vw",
    maxWidth: 600,
    height: "auto",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(7)
    }
  }
});

export default styles;
