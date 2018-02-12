import React, { Component } from "react";
import QuestionTemplate from "./components/QuestionTemplate";
import AlertModal from "./components/Modal";
import "./App.css";
import { API_FETCH_ENDPOINT, API_SUBMIT_ENDPOINT } from "./config";

class App extends Component {
  constructor(props) {
    super(props);
    //initializing the app state
    this.state = {
      questions: [{ question: "", answers: [] }],
      answers: [],
      isModalOpen: false,
      result: { correct: 0, incorrect: 0 }
    };
    //binding class methods for preserving context
    this.onSelect = this.onSelect.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  onSelect(answerObj) {
    let newAnswer = this.state.answers;
    newAnswer[answerObj.qno - 1] = answerObj.answer;
    this.setState({ answers: newAnswer });
  }

  submitAnswers(e) {
    console.log("Submitting ...", this.state.answers);
    let options = {
      method: "POST",
      body: JSON.stringify(this.state.answers),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };
    this.doFetch(API_SUBMIT_ENDPOINT, options)
      .then(res => {
        this.showResult(res);
      })
      .catch(err => console.log(err));
  }

  showResult(res) {
    this.setState({
      isModalOpen: true,
      result: {
        correct: res.correct,
        incorrect: res.incorrect
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> General Knowledge _ </h1>
        </header>
        {this.state.questions.map((item, idx) => {
          let count = idx + 1;
          return (
            <QuestionTemplate
              key={`t-${count}`}
              qCount={count}
              qText={item.question}
              qOptions={item.answers}
              onSelect={this.onSelect}
            />
          );
        })}
        <button onClick={this.submitAnswers}> Submit </button>

        <AlertModal show={this.state.isModalOpen} onClose={this.toggleModal}>
          {this.state.result.correct * 2}
          <br />
          Correct: {this.state.result.correct}
          <br />
          Incorrect: {this.state.result.incorrect}
          <br />
        </AlertModal>
      </div>
    );
  }

  doFetch = async (API, options = {}) => {
    const response = await fetch(API, options);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  componentDidMount() {
    this.doFetch(API_FETCH_ENDPOINT)
      .then(res => {
        this.setState({
          questions: res.questions,
          answers: new Array(res.questions.length)
        });
      })
      .catch(err => console.log(err));
  }
}

export default App;
