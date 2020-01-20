import React, { Component } from "react";
import Create from "./create";

class Edit extends Component {
  state = {
    posts: JSON.parse(localStorage.getItem("yourblog.posts"))
  };

  getPost = () => {
    const { id } = this.props.match.params;
    return JSON.parse(localStorage.getItem("yourblog.posts")).filter(
      p => p.id == id
    )[0];
  };

  render() {
    return (
      <React.Fragment>
        <Create post={this.getPost()} />
      </React.Fragment>
    );
  }
}

export default Edit;
