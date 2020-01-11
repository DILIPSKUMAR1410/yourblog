import React, { Component } from "react";

class View extends Component {
  getPost = () => {
    const { id } = this.props.match.params;
    console.log(this.props.match);
  };
  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export default View;
