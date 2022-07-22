require("dotenv").config();
const express = require("express"); //Line 1
const app = express(); //Line 2
const cors = require("cors");
const uuid = require("uuid");
const port = process.env.PORT || 5000; //Line 3
const errorMiddleware = require("./middlewares/errorMiddleware")
const {Anime} = require("./models")
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const MONGO = process.env.MONGO_URL;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO);
}

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get("/animeLists/:id", async (req, res, next) => {
  try{
    const animeLists = (await Anime.findById(req.params.id));
    const { anime_seen, anime_future, anime_liked, anime_watching } = animeLists;

    const parsed = {
      anime_seen: anime_seen.map(({title, rating, id}) => {
        return {
          title, rating, id
        };
      }),
      anime_future: anime_future.map(({title, rating, id}) => {
        return {
          title, rating, id
        };
      }),
      anime_liked: anime_liked.map(({title, rating, id}) => {
        return {
          title, rating, id
        };
      }),
      anime_watching: anime_watching.map(({title, rating, id}) => {
        return {
          title, rating, id
        };
      }),
    };

    return res.status(200).json(parsed);
  }
  catch(err) {
    return next(err)
  }
  
});

app.post("/animeLists/:id", async function (req, res, next) {
  try {
    const oldList = await Anime.findById(req.params.id);
    const anime = {
      title: req.body.title,
      rating: req.body.rating,
      id: uuid.v4(),
    }
    if (!oldList) {
      const newList = new Anime({
        [req.body.list]: [anime],
        _id: req.params.id,
      })

      await newList.save()
      return res.status(201).json(anime)
    }
  
    if (oldList[req.body.list].some(a => a.title === req.body.title))
    {
      const err = new Error("This title already exists")
      err.name = "CONFLICT"
      throw err
    }
    
    oldList[req.body.list].push(anime)
    await oldList.save()
    return res.status(201).json(anime)
  } catch (err) {
    return next(err)
  }
});

app.use(errorMiddleware)
