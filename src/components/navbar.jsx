import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

import logo_white from "../public/images/logo_white.png";
import logo_blue from "../public/images/logo_blue.png";
import { UserSession, AppConfig } from "blockstack";

const appConfig = new AppConfig();
const options = { decrypt: false };
const userSession = new UserSession({ appConfig: appConfig });

class NavBar extends Component {
  constructor(props) {
    super(props);

    let loggedIn = true;
    if (this.props && this.props.loggedIn === false) {
      loggedIn = this.props.loggedIn;
    }
    this.state = {
      loggedIn,
      username: loggedIn ? userSession.loadUserData().username : ""
    };
  }

  getList = () => {
    return (
      <div className="nav__username">
        {this.state.username}
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/create">New Entry</Link>
          </li>
          <li className="nav__item">
            <Link to="/entries">My Entries</Link>
          </li>
          <li className="nav__item">
            <Link to="/">Sign Out</Link>
          </li>
        </ul>
      </div>
    );
  };

  render() {
    return (
      <nav
        className="navbar"
        style={!this.state.loggedIn ? { backgroundColor: "white" } : {}}
      >
        <Link to="/">
          <div
            className="logo"
            style={{ color: this.state.loggedIn ? "white" : "blue" }}
          >
            <img
              className="logo__img"
              src={this.state.loggedIn ? logo_white : logo_blue}
              alt=""
            />
            yourblog
          </div>
        </Link>
        {!this.state.loggedIn && userSession.isUserSignedIn() ? (
          <Link
            to="/entries"
            className="nav__profile"
            style={{ color: "blue" }}
          >
            Go to Profile
          </Link>
        ) : (
          ""
        )}
        {this.state.loggedIn ? this.getList() : ""}
      </nav>
    );
  }
}

export default NavBar;
