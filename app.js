const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Welcome to Local Library");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
