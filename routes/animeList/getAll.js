const { Anime } = require("../../models");

module.exports = {
  method: "get",
  route: "/animeLists/:id",
  handler: async (req, res, next) => {
    const userId = req.params.id;

    const animes = await Anime.findById(userId);

    if (!animes) {
      const newList = new Anime({
        _id: userId,
        anime_seen: [],
        anime_future: [],
        anime_liked: [],
        anime_watching: [],
      });

      await newList.save();

      return {
        status: 200,
        data: newList,
      };
    }

    return {
      status: 200,
      data: animes,
    };
  },
};
