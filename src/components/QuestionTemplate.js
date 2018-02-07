import React from "react";
import QuestionNumber from "./QuestionNumber";
import Question from "./Question";
import Option from "./Option";

function Template(props) {
  return (
    <div className="qTemplate">
      <div className="question-wrapper">
        <QuestionNumber count={props.qCount} />
        <Question question={props.qText} />
      </div>
      <div className="answer-wrapper">
        <Option
          answers={props.qOptions}
          qId={`ques-${props.qCount}`}
          onSelect={props.onSelect}
          key={`ques-${props.qCount}`}
        />
      </div>
    </div>
  );
}

export default Template;
