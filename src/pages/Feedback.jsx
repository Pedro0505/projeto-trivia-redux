import React from 'react';

class Feedback extends React.Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    console.log(state);
    return (
      <div>
        <header>
          <h1 data-testid="header-player-name">{state.name}</h1>
          <h3 data-testid="header-score">0</h3>
          <img data-testid="header-profile-picture" src={ state.gravatarEmail } alt="" />
        </header>
        <h1 data-testid="feedback-text"> FeedBack </h1>
      </div>
    );
  }
}

export default Feedback;
