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
      isDisabled: false,
      timer: 30,
    };

    this.renderQuestion = this.renderQuestion.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  timer() {
    const oneSecond = 1000;
    this.decrementTime = setInterval(() => {
      const { timer } = this.state;
      if (!timer) {
        clearInterval(this.decrementTime);
        this.setState({ isDisabled: true });
      } else {
        this.setState({ timer: timer - 1 });
      }
    }, oneSecond);
  }

  handleAnswer() {
    this.setState({ isClicked: true });
  }

  renderQuestion({ question,
    correct_answer: correctAnswer, incorrect_answers: incorrectAnswers, category }) {
    const { isClicked, isDisabled } = this.state;
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
              disabled={ isDisabled }
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
    const { timer } = this.state;
    const state = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <header>
          <h1 data-testid="header-player-name">{state.name}</h1>
          <h3 data-testid="header-score">0</h3>
          <img data-testid="header-profile-picture" src={ state.gravatarEmail } alt="" />
        </header>
        <main>
          {
            (questions.length) && this.renderQuestion(questions[0])
          }
        </main>
        <p>
          Timer:
          <span>{timer}</span>
        </p>
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
