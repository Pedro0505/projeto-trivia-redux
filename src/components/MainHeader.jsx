import React from 'react';
import '../MainHeader.css';

export default class MainHeader extends React.Component {
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    return (
      <header>
        <img data-testid="header-profile-picture" src={ player.gravatarEmail } alt="" />
        <div className="info-container">
          <h2 data-testid="header-player-name">{player.name}</h2>
          <h3 data-testid="header-score">
            Score:
            {' '}
            {player.score}
          </h3>
        </div>
      </header>
    );
  }
}
