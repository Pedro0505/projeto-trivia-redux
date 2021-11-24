import { MD5 } from 'crypto-js';

async function savePlayer(email, name) {
  const hash = MD5(email).toString();
  const gravatarEmail = `https://www.gravatar.com/avatar/${hash}`;
  const player = {
    player: {
      name,
      gravatarEmail,
      score: 0,
      assertions: 0,
    },
  };
  localStorage.setItem('state', JSON.stringify(player));
}

const saveQuestions = (state) => ({ type: '@QUIZ/SAVEQUESTION', state });

function fetchTriviaQuestions() {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    dispatch(saveQuestions(data.results));
  };
}

function fetchTriviaToken() {
  return async (dispatch) => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${data.token}`);
    const fetchQuestions = await questions.json();
    dispatch(saveQuestions(fetchQuestions.results));
  };
}

const actions = { fetchTriviaToken, fetchTriviaQuestions, savePlayer };

export default actions;

/* https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

// Recomendação
https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
 */
