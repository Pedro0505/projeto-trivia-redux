import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Ranking.css';
import play from '../image/button-play.svg';

class Ranking extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);
    return (
      <div className="ranking-content">
        <div className="position-container">
          { ranking.map((player, index) => (
            <div
              className={ `ranking-container ${(index % 2) ? 'white' : 'purple'}` }
              key={ index }
            >
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
              <p data-testid={ `player-score-${index}` }>
                {
                  `Pontuação: ${player.score}`
                }
              </p>
            </div>
          )) }
        </div>
        <Link className="play" to="/">
          <img src={ play } alt="button" />
        </Link>
      </div>
    );
  }
}

export default Ranking;
