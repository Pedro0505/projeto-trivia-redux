import React from 'react';

export default class MainHeader extends React.Component {
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    return (
      <header>
        <h1 data-testid="header-player-name">{player.name}</h1>
        <h3 data-testid="header-score">{player.score}</h3>
        <img data-testid="header-profile-picture" src={ player.gravatarEmail } alt="" />
      </header>
    );
  }
}
