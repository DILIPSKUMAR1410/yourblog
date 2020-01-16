import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/navbar";

import img1 from "../public/images/blogging.png";
import img2 from "../public/images/typewriter.png";

import "./home.css";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar loggedIn={false} />
        <section className="section--landing">
          <div className="landing__text">
            Welcome to the world of decentralized <br /> blogging...
          </div>
        </section>
        <section className="section--description">
          <div className="description__text">
            <p className="description__p">
              <strong className="yourblog">yourblog</strong> is your
              decentralized blogging platform that allows you to save your blog
              on the secure decentralized web.
            </p>
            <p className="description__p">
              It is built on blockstack platform which promises data security
              and privacy to the user.
            </p>
          </div>
          <div className="blue-box blue-box--description">
            <img src={img1} alt="" style={{ maxWidth: "100%" }} />
          </div>
        </section>
        <section className="section--features">
          <div className="blue-box blue-box--features">
            <img src={img2} alt="" style={{ maxWidth: "100%" }} />
          </div>
          <ul className="features__list">
            <li className="features__item">Decentralized</li>
            <li className="features__item">Text Editor</li>
            <li className="features__item">Tags</li>
            <li className="features__item">Private</li>
          </ul>
        </section>
        <section className="section--login">
          <Link to="/login" className="login-link">
            Login
          </Link>
          <div className="footer">
            <span className="footer__item footer__item--privacy">
              Privacy/Terms
            </span>
            <span className="footer__item footer__item--copyright">
              Copyright @ yourblog 2019
            </span>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
