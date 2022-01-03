const express = require("express");
const mongoose = require("mongoose");
const app = express();

//atlas setup
const mongoDB =
  "mongodb+srv://khuongduy354:1234567891duy@cluster0.tnjsm.mongodb.net/flashcardDb?retryWrites=true&w=majority";
mongoose.connect(mongoDB);
const db = mongoose.connection;

//routes
const cards = require("./routes/cards");
//middlewares
app.use(express.json());

const port = 8000;

//rest apis
app.get("/", (req, res) => {
  res.send("it worked");
});

//TODO: Add card, read card
app.set("/", route);
app.get("/getInitialCard/", async (req, res) => {
  const userEmail = req.query.userEmail;
  const result = await User.findOne(
    { email: userEmail },
    "flashcards"
  ).populate("flashcards");
  res.send(result.flashcards.slice(0, 12));
});

app.get("/getCard/", async (req, res) => {
  const cardName = req.get("cardName");
  const result = await dbManipulation.findCardByWord(cardName);
  res.send(result);
});

app.listen(port, () => {
  console.log(`run on port ${port}`);
});
