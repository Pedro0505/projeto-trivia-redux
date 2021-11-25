import React from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '../components/MainHeader';

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
    const { player } = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <MainHeader />
        { this.message(player.score) }
        <p data-testid="feedback-total-score">{ player.score }</p>
        <p data-testid="feedback-total-question">{ player.assertions }</p>
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
        <Link
          to="/"
        >
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
