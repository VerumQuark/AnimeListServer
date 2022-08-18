require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const errorMiddleware = require("./middlewares/errorMiddleware");
const mongoose = require("mongoose");
const routeFactory = require("./helpers/routeFactory");
const { getAll, createOne, deleteOne, deleteMany } = require("./routes/animeList");

app.use(cors());
app.use(express.json());

const MONGO = process.env.MONGO_URL;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO);
}

routeFactory([getAll, createOne, deleteOne, deleteMany], app);

app.use(errorMiddleware);

app.listen(port, () => console.log(`Listening on port ${port}`));
