import React from 'react';

class Settings extends React.Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    console.log(state);
    return (
      <div>
        <h1 data-testid="settings-title">{state.name}</h1>
        <img src={ state.gravatarEmail} alt="" />
      </div>
    );
  }
}

export default Settings;
