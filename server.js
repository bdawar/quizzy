const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "api")));
app.get("/questions", (req, res) => {
    res.sendFile(path.join(__dirname, "api", "qBank.json"));
});

app.post("/submit", (req, res) => {
    const correctAnswers = ["a", "a", "a"];
    let submitted = req.body,
        correct = correctAnswers.length;
    for (let i = 0, l = submitted.length; i < l; i++) {
        if (submitted[i] !== correctAnswers[i]) {
            console.log(submitted[i], submitted[i] !== correctAnswers[i]);
            correct--;
        }
    }
    let results = { correct, incorrect: correctAnswers.length - correct };
    return res.send(results);
});

app.listen(port, () => console.log(`Listening on port ${port}`));