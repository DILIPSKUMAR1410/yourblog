import React, { Component } from "react";
import NavBar from "../components/navbar";
import "./create.css";
class Create extends Component {
  constructor() {
    super();
    if (this.props && this.props.post) {
      console.log(this.props.post);
      const { title, tags, content } = this.props.post;
      this.state = {
        edit: true,
        inputs: {
          title,
          tags,
          content
        }
      };
    } else {
      this.state = {
        edit: false,
        inputs: {
          title: "",
          tags: "",
          content: ""
        }
      };
    }
  }

  clickHandler = e => {
    e.preventDefault();
    console.log("Submitted!");
    let posts = JSON.parse(localStorage.getItem("yourblog.posts")) || [];
    if (this.state.edit) {
      // eslint-disable-next-line
      posts = posts.filter(post => post.id != this.props.post.id);
    }
    posts.push({
      id: Math.round(Math.random() * 1000),
      ...this.state.inputs,
      date: new Date().toDateString()
    });

    localStorage.setItem("yourblog.posts", JSON.stringify(posts));
    window.location.href = "/entries";
  };

  handleChange = e => {
    let { inputs } = this.state;
    let { name, value } = e.target;
    inputs[name] = value;
    this.setState({ inputs: inputs });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="create">
          <form className="create__form">
            <input
              onChange={this.handleChange}
              name="title"
              value={this.state.inputs.title}
              className="form__input input--title"
              placeholder="Title"
            />
            <input
              onChange={this.handleChange}
              name="tags"
              value={this.state.inputs.tags}
              className="form__input input--tags"
              placeholder="Tags"
            />
            <textarea
              onChange={this.handleChange}
              name="content"
              value={this.state.inputs.content}
              className="form__input input--content"
              placeholder="Content"
            />
            <input
              type="submit"
              onClick={this.clickHandler}
              className="form__submit"
              value="Publish"
            />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Create;
