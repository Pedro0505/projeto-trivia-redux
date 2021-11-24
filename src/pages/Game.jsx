import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import '../Game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      isClicked: false,
    };

    this.renderQuestion = this.renderQuestion.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  handleAnswer({ target }) {
    this.setState({ isClicked: true }, () => {
      const elementCorrect = document.querySelector('.correct').textContent;
      if (elementCorrect === target.textContent) {
        console.log('correct answer');
        const state = JSON.parse(localStorage.getItem('state'));
        state.player.score += 1;
        localStorage.setItem('state', JSON.stringify(state));
      }
    });
  }

  renderQuestion({ question,
    correct_answer: correctAnswer, incorrect_answers: incorrectAnswers, category }) {
    const { isClicked } = this.state;
    return (
      <div>
        <h3 data-testid="question-text">{question}</h3>
        <h3 data-testid="question-category">{category}</h3>
        {
          [...incorrectAnswers, correctAnswer].map((option, index) => (
            <button
              className={ (isClicked) && ((
                correctAnswer === option) ? 'correct' : 'wrong') }
              type="button"
              key={ option }
              id={ correctAnswer === option ? 'correct-answer' : `wrong-answer-${index}` }
              data-testid={
                correctAnswer === option ? 'correct-answer' : `wrong-answer-${index}`
              }
              onClick={ this.handleAnswer }
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
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaQuestions: () => dispatch(actions.fetchTriviaQuestions()),
});

const mapStateToProps = (state) => ({
  questions: state.quiz.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
