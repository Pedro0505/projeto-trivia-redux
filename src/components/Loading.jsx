import React from 'react';
import trybe from '../image/trybe.svg';

class Loading extends React.Component {
  render() {
    return (
      <img className="loading" src={ trybe } alt="Loading" />
    );
  }
}

export default Loading;
