import React from 'react';

class LogIn extends React.Component {
  constructor() {
    super();
    login: null;
    password: null;
  }

  onSubmit = (e) => {
    e.preventDefault();

    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        name: this.login.value,
        password: this.password.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => { this.props.history.push('/calendar') })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <form className="login" onSubmit={this.onSubmit}>
        <label className="login__label">
          <input type="text" className="login__text" ref={(node) => { this.login = node; }} placeholder="Username or email" />
        </label>
        <label className="login__label">
          <input type="password" className="login__text" ref={(node) => { this.password = node; }} placeholder="Password" />
        </label>
        <input type="submit" className="login__submit" value="Log In" />
      </form>
    );
  }
}

export default LogIn;
