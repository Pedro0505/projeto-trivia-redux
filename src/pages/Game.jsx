import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import actions from '../actions';
import '../Game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      isClicked: false,
      isDisabled: false,
      timer: 30,
      index: 0,
    };

    this.renderQuestion = this.renderQuestion.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.timer = this.timer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
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
        this.setState({ isDisabled: true, isClicked: true });
      } else {
        this.setState({ timer: timer - 1 });
      }
    }, oneSecond);
  }

  nextQuestion() {
    const { index } = this.state;
    const limit = 4;
    if (index === limit) return this.setState({ lastQuestion: true });
    this.setState({ index: (index + 1), isClicked: false, timer: 30 }, this.timer);
  }

  handleAnswer({ target }) {
    clearInterval(this.decrementTime);
    this.setState({ isClicked: true }, () => {
      const elementCorrect = document.querySelector('.correct').textContent;
      if (elementCorrect === target.textContent) {
        const state = JSON.parse(localStorage.getItem('state'));
        state.player.score += 1;
        localStorage.setItem('state', JSON.stringify(state));
      }
    });
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
    const { timer, isClicked, index, lastQuestion } = this.state;
    const state = JSON.parse(localStorage.getItem('state'));
    if (lastQuestion) return <Redirect to="/feedback" />;
    return (
      <div>
        <header>
          <h1 data-testid="header-player-name">{state.player.name}</h1>
          <h3 data-testid="header-score">0</h3>
          <img data-testid="header-profile-picture" src={ state.gravatarEmail } alt="" />
        </header>
        <main>
          {
            (questions.length) && this.renderQuestion(questions[index])
          }
        </main>
        <p>
          Timer:
          <span>{timer}</span>
        </p>
        { isClicked && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.nextQuestion }
          >
            Próxima
          </button>
        )}
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
