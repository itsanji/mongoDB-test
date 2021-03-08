const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();

const mongoose = require("mongoose");

//MiddleWare
app.use(express.static(path.join(__dirname, "static")));

//Import Route
const wordsRoute = require("./routes/postWords");

//DB
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("connected");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.use(express.json());
//Route Middleware

app.use("/api/words", wordsRoute);

app.listen(5000, () => console.log("listening on port 5000"));
