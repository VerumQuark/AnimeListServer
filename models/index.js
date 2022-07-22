const mongoose = require("mongoose");
const {animeListsSchema} = require("./schemas")

exports.Anime = mongoose.model("anime", animeListsSchema);