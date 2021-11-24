import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

class Game extends React.Component {
  constructor() {
    super();
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  /*   componentDidMount() {
      const { fetchTriviaQuestions } = this.props;
      fetchTriviaQuestions();
    } */

  renderQuestion({ question,
    correct_answer: correctAnswer, incorrect_answers: incorrectAnswers, category }) {
    return (
      <div>
        <h3 data-testid="question-text">{question}</h3>
        <h3 data-testid="question-category">{category}</h3>
        {
          [...incorrectAnswers, correctAnswer].map((option, index) => (
            <button
              type="button"
              key={ option }
              data-testid={
                correctAnswer === option ? 'correct-answer' : `wrong-answer-${index}`
              }
            >
              {option}
            </button>
          ))
        }
      </div>
    );
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    const state = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <header>
          <h1 data-testid="header-player-name">{state.name}</h1>
          <h3 data-testid="header-score">0</h3>
          <img data-testid="header-profile-picture" src={ state.gravatarEmail } alt="" />
          {
            (questions.length) && this.renderQuestion(questions[0])
          }
        </header>
      </div>
    );
  }
}

Game.propTypes = {
  // fetchTriviaQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaQuestions: () => dispatch(actions.fetchTriviaQuestions()),
});

const mapStateToProps = (state) => ({
  questions: state.quiz.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
