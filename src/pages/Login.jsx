import React from 'react';
import { Link } from 'react-router-dom';
import { MD5 } from 'crypto-js';
import actions from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
    this.handle = this.handle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handle({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { email, name } = this.state;
    actions.fetchTriviaToken();
    actions.savePlayer(email, name);
  }

  render() {
    const { name, email } = this.state;
    console.log(MD5(email).toString());
    const validEmail = new RegExp(/[\w\d]+@[\w\d]+[.]com+/);
    return (
      <div>
        <input
          onChange={ this.handle }
          value={ name }
          name="name"
          type="text"
          data-testid="input-player-name"
        />
        <input
          onChange={ this.handle }
          value={ email }
          name="email"
          type="text"
          data-testid="input-gravatar-email"
        />
        <Link to="/game">
          <button
            type="button"
            disabled={ !(name && validEmail.test(email)) }
            data-testid="btn-play"
            onClick={ this.handleSubmit }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
            // disabled={ !(name && email) }
            data-testid="btn-settings"
            onClick={ this.handleSubmit }
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
