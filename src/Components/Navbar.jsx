import React, { Fragment, PureComponent } from "react";
import { Link } from "react-router-dom";

// Material UI Components
import {
  MenuIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ChipIcon,
  CogIcon,
  ArchiveIcon,
} from "@heroicons/react/outline";
import { Container } from "./Basics";
import clsx from "clsx";

const ICON_CLASSES = "inline-block h-5 w-5 mr-2";

class Navbar extends PureComponent {
  state = {
    currentPath: "home",
  };

  setPath = (path) => {
    return () => {
      this.setState({
        currentPath: path,
      });
    };
  };

  signOut = () => {
    this.props.firebase.auth().signOut();
  };

  getSensors = () => {};

  render() {
    // Refresh to check if token is still valid on every nav
    this.props.firebase.auth().currentUser.reload();

    return (
      <div className="absolute h-full w-full shadow drawer drawer-mobile h-52">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col drawer-content">
          <div className="w-full navbar">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <MenuIcon className={ICON_CLASSES} />
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              <span className="text-lg font-bold">{/* Add title here */}</span>
            </div>
            <div className="dropdown dropdown-end flex-none">
              <button
                className="btn btn-square btn-ghost w-24"
                onClick={this.signOut}
              >
                Sign Out
              </button>
            </div>
          </div>
          <Container>{this.props.children}</Container>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="p-4 pt-10 w-72 overflow-y-auto gap-2 menu bg-white border-2">
            <li>
              <Link
                to="/"
                onClick={this.setPath("home")}
                className={clsx(
                  this.state.currentPath === "home" ? "active" : ""
                )}
              >
                <HomeIcon className={ICON_CLASSES} />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/sensors"
                onClick={this.setPath("sensors")}
                className={clsx(
                  this.state.currentPath === "sensors" ? "active" : ""
                )}
              >
                <ArchiveIcon className={ICON_CLASSES} />
                Sensors
              </Link>
              <ul className="p-2 gap-2 menu">
                {Object.keys(this.props.sensors).map((sensor) => (
                  <li key={"nav-" + sensor}>
                    <Link
                      to={`/sensors/${sensor}`}
                      onClick={this.setPath(`sensors/${sensor}`)}
                      className={clsx(
                        this.state.currentPath === `sensors/${sensor}`
                          ? "active"
                          : ""
                      )}
                    >
                      <ChipIcon className={ICON_CLASSES} />
                      {sensor}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                to="/help"
                onClick={this.setPath("help")}
                className={clsx(
                  this.state.currentPath === "help" ? "active" : ""
                )}
              >
                <QuestionMarkCircleIcon className={ICON_CLASSES} />
                Help
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                onClick={this.setPath("account")}
                className={clsx(
                  this.state.currentPath === "account" ? "active" : ""
                )}
              >
                <CogIcon className={ICON_CLASSES} />
                Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;

// <div>
// <AppBar position="static">
//   <Toolbar>
//     <Grid justify="space-between" container spacing={0}>
//       <Grid item>
//         <IconButton
//           color="inherit"
//           aria-label="open drawer"
//           onClick={() => {
//             this.setDrawerOpenState(!this.state.drawerOpen);
//             this.setSensorOpenState(false);
//           }}
//         >
//           <MenuIcon />
//         </IconButton>
//       </Grid>
//       <Grid item>
//         <Button
//           color="primary"
//           onClick={this.signOut}
//         >
//           Sign Out
//         </Button>
//       </Grid>
//     </Grid>
//   </Toolbar>
// </AppBar>
// <NavBarMenu
//   firebase={this.props.firebase}
//   sensors={this.props.sensors}
//   isDrawerOpen={this.state.drawerOpen}
//   isSensorsOpen={this.state.sensorsOpen}
//   setDrawerOpenState={this.setDrawerOpenState}
//   setSensorOpenState={this.setSensorOpenState}
// />
// </div>
// </ClickAwayListener>
