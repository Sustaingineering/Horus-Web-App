import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

// Material UI Components
import {
  MenuIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ChipIcon,
  CogIcon,
  ArchiveIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { Container } from "./Basics";
import clsx from "clsx";

const ICON_CLASSES = "inline-block h-5 w-5 mr-2";

class Navbar extends PureComponent {
  navbarRef = React.createRef();

  clickHandler = () => {
    if (this.navbarRef.current && this.navbarRef.current.checked) {
      this.navbarRef.current.checked = false;
    }
  };

  signOut = () => {
    this.props.firebase.auth().signOut();
  };

  render() {
    // Refresh to check if token is still valid on every nav
    this.props.firebase.auth().currentUser.reload();
    return (
      <div className="absolute h-full w-full shadow drawer drawer-mobile h-52">
        <input
          ref={this.navbarRef}
          id="my-drawer-3"
          type="checkbox"
          className="drawer-toggle"
        />
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
          </div>
          <div>
            <Container>{this.props.children}</Container>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="p-4 pt-10 w-72 overflow-y-auto gap-1 menu bg-white lg:border-r-2">
            <h3 className="text-sm uppercase text-gray-500 font-semibold pb-5">
              Horus
            </h3>
            <li>
              <Link
                to="/"
                onClick={this.clickHandler}
                className={clsx(
                  this.props.currentPath === "home" ? "active" : ""
                )}
              >
                <HomeIcon className={ICON_CLASSES} />
                Updates
              </Link>
            </li>
            <li>
              <Link
                to="/sensors"
                onClick={this.clickHandler}
                className={clsx(
                  this.props.currentPath === "sensors" ? "active" : ""
                )}
              >
                <ArchiveIcon className={ICON_CLASSES} />
                Sensors
              </Link>
              <ul className="p-1 gap-1 menu">
                {Object.keys(this.props.sensors).map((sensor) => (
                  <li key={"nav-" + sensor}>
                    <Link
                      to={`/sensors/${sensor}`}
                      onClick={this.clickHandler}
                      className={clsx(
                        this.props.currentPath === `sensors/${sensor}`
                          ? "active"
                          : ""
                      )}
                    >
                      <ChipIcon className={ICON_CLASSES} />
                      {sensor.slice(0, 16) + (sensor.length > 16 ? "..." : "")}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                to="/help"
                onClick={this.clickHandler}
                className={clsx(
                  this.props.currentPath === "help" ? "active" : ""
                )}
              >
                <QuestionMarkCircleIcon className={ICON_CLASSES} />
                Help
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                onClick={this.clickHandler}
                className={clsx(
                  this.props.currentPath === "account" ? "active" : ""
                )}
              >
                <CogIcon className={ICON_CLASSES} />
                Account
              </Link>
            </li>
            <li>
              <a onClick={this.signOut}>
                <LogoutIcon className={ICON_CLASSES} />
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
