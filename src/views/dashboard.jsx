import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/navbar";

import "./dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <section className="create">
          <h2 className="create__title">Create your blog</h2>
          <div className="create__options">
            <Link to="/create" className="create__option">
              Compose Blog
            </Link>
            <Link className="create__option option--disabled">
              Daily Journal
              <span className="option__subtext">In the pipeline</span>
            </Link>
            <Link className="create__option option--disabled">
              Report
              <span className="option__subtext">In the pipeline</span>
            </Link>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Dashboard;
