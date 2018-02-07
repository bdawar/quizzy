import React, { Component } from "react";
import QuestionTemplate from "./components/QuestionTemplate";
import "./App.css";
import { API_URL } from "./config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: [], answers: [] };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(answerObj) {
    console.table(answerObj);
    //this.setState({ answers: [...this.state.answers, newAnswer] });
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

        <button onClick={this.submitAnswer}>Submit</button>
      </div>
    );
  }

  componentDidMount() {
    this.doFetch()
      .then(res => {
        this.setState({ questions: res });
      })
      .catch(err => console.log(err));
  }

  doFetch = async () => {
    const response = await fetch(API_URL);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  submitAnswers(e) {}
}

export default App;
