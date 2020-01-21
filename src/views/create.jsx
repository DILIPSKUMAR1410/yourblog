import React, { Component } from "react";
import NavBar from "../components/navbar";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./create.css";
import { UserSession, AppConfig } from "blockstack";

const appConfig = new AppConfig();
const options = { encrypt: false };
const userSession = new UserSession({ appConfig: appConfig });

class Create extends Component {
  constructor(props) {
    super(props);
    if (this.props && this.props.post) {
      console.log(this.props.post);
      const { title, tags, content } = this.props.post;
      this.state = {
        edit: true,
        editorState: EditorState.createEmpty(),
        inputs: {
          title,
          tags,
          content
        }
      };
    } else {
      this.state = {
        edit: false,
        editorState: EditorState.createEmpty(),
        inputs: {
          title: "",
          tags: "",
          content: ""
        }
      };
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
      inputs: {
        ...this.state.inputs,
        content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
      }
    });
  };

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

    userSession
      .putFile("posts.json", JSON.stringify(posts), options)
      .then(() => {
        localStorage.setItem("yourblog.posts", JSON.stringify(posts));
        window.location.href = "/entries";
      });
  };

  handleChange = e => {
    let { inputs } = this.state;
    let { name, value } = e.target;
    inputs[name] = value;
    this.setState({ inputs: inputs });
  };

  render() {
    const editorState = this.state.editorState;
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
            <Editor
              editorState={editorState}
              wrapperClassName="editor-wrapper"
              editorClassName="editor-textarea"
              toolbarClassName="editor-toolbar"
              onEditorStateChange={this.onEditorStateChange}
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
