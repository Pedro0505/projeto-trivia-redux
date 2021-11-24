const INITIAL_STATE = {
  questions: [],
};

const quiz = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case '@QUIZ/SAVEQUESTION':
    return { ...state, questions: action.state };
  default:
    return state;
  }
};

export default quiz;
