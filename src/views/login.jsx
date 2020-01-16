import React, { Component } from "react";
import NavBar from "../components/navbar";
import "./login.css";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    // Fix: Change this.
    console.log("Loggin in");

    window.location.href = "/entries";
  };

  render() {
    return (
      <React.Fragment>
        <NavBar loggedIn={false} />
        <form action="" className="login-form" onSubmit={this.onSubmitHandler}>
          <h2 className="login__heading">Login</h2>
          <input
            type="text"
            className="login__input login__input--username"
            placeholder="Username"
            onChange={this.onChangeHandler}
            value={this.username}
            name="username"
          />
          <input
            type="password"
            className="login__input login__input--password"
            placeholder="Password"
            onChange={this.onChangeHandler}
            value={this.password}
            name="password"
          />
          <input type="submit" className="login__submit" value="Login" />
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
