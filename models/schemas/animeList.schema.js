const mongoose = require("mongoose");
const { Schema } = mongoose;

const animeSchema = new Schema(
  {
    id: String,
    title: String,
    rating: Number,
  },
  {_id: false}
);

const animeListsSchema = new Schema(
  {
    _id: Number,
    anime_watching: [animeSchema],
    anime_seen: [animeSchema],
    anime_liked: [animeSchema],
    anime_future: [animeSchema],
  },
);


module.exports = animeListsSchema;