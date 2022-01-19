import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Feedback.css';
import feedback from '../image/feedback.svg';

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
      <div className="feedback-content">
        <div className="score-container">
          <p data-testid="feedback-total-score">{ `Pontuação: ${player.score}` }</p>
          <p data-testid="feedback-total-question">{ `Acertos: ${player.assertions}` }</p>
        </div>
        <img src={ feedback } alt="Pessoas" className="image-feedback" />
        <div className="btn-feedback">
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
      </div>
    );
  }
}

export default Feedback;
