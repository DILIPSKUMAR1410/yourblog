import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/navbar";
import "./entries.css";
import {
  UserSession,
  AppConfig
} from 'blockstack';

const appConfig = new AppConfig()
const options = { decrypt: false };
const userSession = new UserSession({ appConfig: appConfig })
let state = {}

class Entries extends Component {
  constructor() {
    super();
    userSession.getFile("posts2.json", options)
  .then((content) => {      
      localStorage.setItem('yourblog.posts', content);
       this.state = {
       posts: localStorage.getItem("yourblog.posts") || []
       };
      });
    }
    
  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        this.setState({ userData: userData})
      });
    }
  }
  state = {
    posts: JSON.parse(localStorage.getItem("yourblog.posts")) || []
  };

  handleDelete = id => {
    let posts = JSON.parse(localStorage.getItem("yourblog.posts")) || [];
    // eslint-disable-next-line
    posts = posts.filter(post => post.id != id);
    localStorage.setItem("yourblog.posts", JSON.stringify(posts));
    this.setState({ posts });
  };

  handleShare = id => {
    console.log("share post" + id);
  };

  getEntries = () => {
    return this.state.posts.map(entry => {
      return (
        <li key={entry.id} className="entries__item">
          <span className="entry__item entry__item--title">
            <Link to={"/entry/" + entry.id}>{entry.title}</Link>
          </span>
          <span className="entry__item entry__item--tags">{entry.tags}</span>
          <span className="entry__item entry__item--date">{entry.date}</span>
          <Link
            to={`/edit/${entry.id}`}
            className="entry__item entry__item--edit"
          >
            Edit
          </Link>
          <button
            className="entry__item entry__item--delete"
            onClick={e => {
              e.preventDefault();
              this.handleDelete(entry.id);
            }}
          >
            Delete
          </button>
          <button
            className="entry__item entry__item--share"
            onClick={e => {
              e.preventDefault();
              this.handleShare(entry.id);
            }}
          >
            Share
          </button>
        </li>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="entries">
          <h2 className="entries__title">My Entries</h2>
          <ul className="entries__list">{this.getEntries()}</ul>
          <Link to="/create" className="new-entry-button">
            New Entry
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Entries;
