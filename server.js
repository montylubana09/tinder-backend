import express, { response } from "express";
import Cors from "cors";
import mongoose from "mongoose";
import cards from "./dbCards.js";
//app config
const connection_url =
  "mongodb+srv://admin:Monty007@cluster0.ascf2.mongodb.net/tinderdb?retryWrites=true&w=majority";
const app = express();
const port = process.env.PORT || 8001;

// middlewares
app.use(express.json());
app.use(Cors());
//db config
mongoose.connect(connection_url);
//api endpoint

app.get("/", (req, res) => res.status(200).send("Hey there!"));
app.post("/cards", (req, res) => {
  const dbCard = req.body;
  //
  cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/cards", (req, res) => {
  cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
//listener

app.listen(port, console.log(`listening on localhost: ${port}`));
