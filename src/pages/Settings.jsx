import React from 'react';

class Settings extends React.Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    console.log(state);
    return (
      <div>
        <header>
          <h1 data-testid="settings-title">{state.name}</h1>
          <img src={ state.gravatarEmail } alt="" />
        </header>
      </div>
    );
  }
}

export default Settings;
