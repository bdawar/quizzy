import React, { Component } from "react";
import QuestionTemplate from "./components/QuestionTemplate";
import "./App.css";
import { API_FETCH_ENDPOINT, API_SUBMIT_ENDPOINT } from "./config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: [{ question: "", answers: [] }], answers: [] };
    this.onSelect = this.onSelect.bind(this);
    this.submitAnswers = this.submitAnswers.bind(this);
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
        alert(
          `Your score:${res.correct * 2}, correct:${res.correct}, incorrect:${
            res.incorrect
          }`
        );
      })
      .catch(err => console.log(err));
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

        <button onClick={this.submitAnswers}>Submit</button>
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
