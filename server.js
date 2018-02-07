const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "api")));
app.get("/questions", (req, res) => {
    res.sendFile(path.join(__dirname, "api", "qBank.json"));
});

app.get("/submit", (req, res) => {
    return res.send({ result: "Checking..." });
});

app.listen(port, () => console.log(`Listening on port ${port}`));