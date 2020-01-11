import React, { Component } from "react";
import NavBar from "../components/navbar";
import { Link } from "react-router-dom";
import "./view.css";

class View extends Component {
  getTags = tagString => {
    const tags = tagString.split(/[,.]\s*/);
    return tags.map(tag => {
      return (
        <span key={tag} className="post__tag">
          {tag}
        </span>
      );
    });
  };

  getPost = () => {
    const { id } = this.props.match.params;
    const post = JSON.parse(localStorage.getItem("yourblog.posts")).filter(
      p => p.id == id
    )[0];

    return (
      <div className="post">
        <h2 className="post__title">{post.title}</h2>
        <div className="post__tags">{this.getTags(post.tags)}</div>
        <div className="post__content">{post.content}</div>
        <Link to={`/edit/${post.id}`} className="post__edit">
          Edit
        </Link>
        <button className="post__share">Share</button>
      </div>
    );
  };
  render() {
    return (
      <React.Fragment>
        <NavBar />
        {this.getPost()}
      </React.Fragment>
    );
  }
}

export default View;
