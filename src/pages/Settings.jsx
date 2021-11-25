import React from 'react';

class Settings extends React.Component {
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <header>
          <h1 data-testid="settings-title">{player.name}</h1>
          <img src={ player.gravatarEmail } alt="avatar" />
        </header>
      </div>
    );
  }
}

export default Settings;
