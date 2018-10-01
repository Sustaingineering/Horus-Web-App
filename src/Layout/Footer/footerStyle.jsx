// Footer Styles
import { primaryColor } from "../../assets/jss/mainStyle";

const footerStyle = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: primaryColor,
    width: "100%",
    height: "40px"
  },
  content: {
    position: "relative",
    top: "10px",
    right: "20px"
  }
});

export default footerStyle;
