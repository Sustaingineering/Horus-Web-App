const titlebarStyle = theme => ({
  title_bar: {
    WebkitAppRegion: "drag",
    margin: 0,
    display: "flex",
    backgroundColor: "#1e1e2d",
    color: "white",
    width: "100%",
    height: 30,
    position: "fixed",
    zIndex: 9999,
    top: 0
  },
  menu_button_container: {
    display: "flex",
    alignItems: "center",
    flexGrow: 3,
    width: "30%"
  },
  app_name_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 3,
    width: "30%"
  },
  window_controls_container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexGrow: 3,
    width: "30%"
  },
  menu_button_cont: {
    position: "relative",
    top: 0,
    margin: 0,
    padding: 0,
    width: 40,
    height: 30,
    backgroundColor: "#1e1e2d",
    border: "none"
  },
  menu_button: {
    WebkitAppRegion: "no-drag",
    backgroundColor: "#1e1e2d",
    color: "white",
    width: 40,
    height: 30,
    // borderRadius: 100,
    "&:hover": {
      backgroundColor: "#344675"
    }
  },
  minimize_button: {
    WebkitAppRegion: "no-drag",
    backgroundColor: "#00f2c3",
    marginLeft: 10,
    marginRight: 10,
    width: 20,
    height: 20,
    border: "none",
    borderRadius: 100,
    "&:hover": {
      backgroundColor: "#344675"
    }
  },
  min_max_button: {
    WebkitAppRegion: "no-drag",
    backgroundColor: "#1d8cf8",
    marginLeft: 10,
    marginRight: 10,
    width: 20,
    height: 20,
    border: "none",
    borderRadius: 100,
    "&:hover": {
      backgroundColor: "#344675"
    }
  },
  close_button: {
    WebkitAppRegion: "no-drag",
    backgroundColor: "#fd5d93",
    marginLeft: 10,
    marginRight: 10,
    width: 20,
    height: 20,
    border: "none",
    borderRadius: 100,
    "&:hover": {
      backgroundColor: "#344675"
    }
  }
});

export default titlebarStyle;
