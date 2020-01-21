import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/navbar";
import "./entries.css";
import { UserSession, AppConfig } from "blockstack";

const appConfig = new AppConfig();
const options = { decrypt: false };
const userSession = new UserSession({ appConfig: appConfig });

class Entries extends Component {
  state = {
    posts: JSON.parse(localStorage.getItem("yourblog.posts")) || []
  };

  async componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        this.setState({ userData: userData });
      });
    }
    try {
      const content = await userSession.getFile("posts.json", options);
      localStorage.setItem("yourblog.posts", content);
      this.setState({
        posts: JSON.parse(localStorage.getItem("yourblog.posts")) || []
      });
    } catch (err) {
      console.error("Error" + err);
    }
  }

  handleDelete = id => {
    let posts = JSON.parse(localStorage.getItem("yourblog.posts")) || [];
    // eslint-disable-next-line
    posts = posts.filter(post => post.id != id);

    userSession
      .putFile("posts.json", JSON.stringify(posts), {encrypt: false})
      .then(() => {
        localStorage.setItem("yourblog.posts", JSON.stringify(posts));
      });

    this.setState({ posts });
  };

  handleShare = id => {
    console.log("share post" + id);
  };

  getEntries = () => {
    console.log(this.state)
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
