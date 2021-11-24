async function fetchTriviaToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  localStorage.setItem('token', data.token);
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

const actions = { fetchTriviaToken, fetchTriviaQuestions };

export default actions;

/* https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

// Recomendação
https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
 */