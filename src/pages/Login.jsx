import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../actions';
import celular from './celular.svg';
import '../Login.css';

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
    const { fetchTriviaToken: fetchTrivia } = this.props;
    fetchTrivia();
    actions.savePlayer(email, name);
  }

  render() {
    const { name, email } = this.state;
    const validEmail = new RegExp(/[\w\d]+@[\w\d]+[.]com+/);
    return (
      <div className="main-content">
        <img className="image-container" src={ celular } alt="celular" />
        <div className="input-container">
          <input
            onChange={ this.handle }
            value={ name }
            name="name"
            type="text"
            data-testid="input-player-name"
            placeholder="Digite seu nome..."
          />
          <input
            onChange={ this.handle }
            value={ email }
            name="email"
            type="text"
            data-testid="input-gravatar-email"
            placeholder="Digite seu email..."
          />
        </div>
        <div className="btn-container">
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleSubmit }
            >
              Configurações
            </button>
          </Link>
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
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  fetchTriviaToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaToken: () => dispatch(actions.fetchTriviaToken()),
});

export default connect(null, mapDispatchToProps)(Login);
