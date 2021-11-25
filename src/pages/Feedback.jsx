import React from 'react';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  constructor() {
    super();
    this.message = this.message.bind(this);
  }

  message(score) {
    const limit = 3;
    if (score < limit) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    } return <p data-testid="feedback-text">Mandou bem!</p>;
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <header>
          <h1 data-testid="header-player-name">{state.player.name}</h1>
          <h3 data-testid="header-score">{ state.player.score }</h3>
          <img
            data-testid="header-profile-picture"
            src={ state.player.gravatarEmail }
            alt=""
          />
        </header>
        { this.message(state.player.score) }
        <Link
          to="/ranking"
        >
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
