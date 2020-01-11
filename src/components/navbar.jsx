import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

import logo from "../public/images/logo_white.png";

class NavBar extends Component {
  state = {
    username: "Rambor.me"
  };

  render() {
    return (
      <nav className="navbar">
        <div className="logo">
          <img className="logo__img" src={logo} alt="" />
        </div>
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
      </nav>
    );
  }
}

export default NavBar;
