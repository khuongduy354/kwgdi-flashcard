var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var app = express();
//atlas setup

var mongoDB =
  "mongodb+srv://khuongduy354:1234567891duy@cluster0.tnjsm.mongodb.net/flashcardDb?retryWrites=true&w=majority";
mongoose.connect(mongoDB);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
//import models
var User = require("./models/user");
var Tag = require("./models/tag");
var FlashCard = require("./models/flashcard");
var dbManipulation = require("./ultility");
var cors = require("cors");
//middlewares
app.use(express.json());
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use((req, res, next) => {
  //allow access from every, elminate CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.removeHeader("x-powered-by");
  //set the allowed HTTP methods to be requested
  res.setHeader("Access-Control-Allow-Methods", "POST");
  //headers clients can use in their requests
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  //allow request to continue and be handled by routes
  next();
});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "jade");

const port = 8000;

//rest apis
app.get("/", (req, res) => {
  res.send("it worked");
});

//make cards format ',' along with definition and link tag
app.post("/makeCard/", async (req, res) => {
  const body = req.body;
  const wordsArray = body.words.split(",");
  const userEmail = body.userEmail;
  const userUid = body.userUid;
  const defsArray = body.definitions.split(",");
  const querySet = await User.findOne({ uid: userUid, email: userEmail });

  if (defsArray.length != wordsArray.length) {
    res.status(400).send({
      "Invalid Input":
        "Please make sure the amount of words equal the amount of definitions",
    });
  } //link tag and card if has at least 1 tag
  if (querySet == null) {
    var theUser = await User.create({ email: userEmail, uid: userUid });
  } else {
    var theUser = querySet;
  }
  if (body.tags) {
    const tagsArray = body.tags.split(",");
    var tagsResult = [];
    for (let tag of tagsArray) {
      // make tags
      let result = await dbManipulation.createTag(tag);
      tagsResult.push(result);
    }
    for (let i = 0; i < wordsArray.length; i++) {
      // make card then for each card, add an array of tags
      dbManipulation
        .createFlashCard({
          word: wordsArray[i],
          definition: defsArray[i],
        })
        .then(async (card) => {
          for (let tag of tagsResult) {
            let result = await dbManipulation.addTagToCard(card._id, tag._id);
            let result2 = await User.findByIdAndUpdate(theUser._id, {
              $push: { flashcards: card._id },
            });
          }
        });
    } //else just make cards
  } else {
    for (let i = 0; i < wordsArray.length; i++) {
      dbManipulation
        .createFlashCard({
          word: wordsArray[i],
          definition: defsArray[i],
        })
        .then(async (card) => {
          let result2 = await User.findByIdAndUpdate(theUser._id, {
            $push: { flashcards: card._id },
          });
        });
    }
  }
  res.send("Success");
});
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

//error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});
app.listen(port, () => {
  console.log(`run on port ${port}`);
});

module.exports = app;
