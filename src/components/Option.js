import React, { Component } from "react";

class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.doSelect = this.doSelect.bind(this);
  }

  render() {
    let props = this.props;
    return props.answers.map((answer, idx) => {
      return (
        <label>
          <input
            key={`opt-${props.qId}`}
            type="radio"
            name={props.qId}
            value={answer.value}
            onChange={this.doSelect}
          />
          {answer.text}
        </label>
      );
    });
  }

  doSelect(e) {
    let answerObj = {};
    answerObj.qno = e.target.name.split("-")[1];
    answerObj.answer = e.target.value;
    this.props.onSelect(answerObj);
  }
}

export default Option;
