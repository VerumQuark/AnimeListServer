const { Anime } = require("../../models");
const uuid = require("uuid");

module.exports = {
  method: "post",
  route: "/animeLists/:id",
  handler: async (req, res, next) => {
    const userId = req.params.id;
    const { list, title, rating } = req.body;
    const anime = {
      title,
      rating,
      id: uuid.v4(),
    };

    const oldList = await Anime.findById(req.params.id);

    if (!oldList) {
      const newList = new Anime({
        [list]: [anime],
        _id: userId,
      });
      await newList.save();

      return {
        status: 201,
        data: anime,
      };
    }

    if (!oldList[list]) {
      oldList[list] = [anime];

      await oldList.save();

      return {
        status: 201,
        data: anime,
      };
    }

    if (oldList[list].some((a) => a.title === title)) {
      const err = new Error("This title already exists");
      err.name = "CONFLICT";
      throw err;
    }

    oldList[list].push(anime);
    await oldList.save();

    return {
      status: 201,
      data: anime,
    };
  },
};
