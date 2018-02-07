import React from "react";

const QuestionNumber = props => {
    return <span className = "qno" > {
        ("0" + props.count).slice(-2) } < /span>;
};

export default QuestionNumber;