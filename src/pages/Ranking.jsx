import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Raking</h1>
        { ranking.map((player, index) => (
          <div key={ index }>
            <img src={ player.gravatarEmail } alt="avatar" />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </div>
        )) }
        <Link to="/">
          <button type="button" data-testid="btn-go-home"> Inicio </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
