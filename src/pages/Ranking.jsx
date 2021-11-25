import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Raking</h1>
        <Link to="/">
          <button type="button" data-testid="btn-go-home"> Inicio </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
