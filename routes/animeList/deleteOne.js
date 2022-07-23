const { Anime } = require("../../models");

module.exports = {
  method: "delete",
  route: "/animeLists/:uid/:list/:id",
  handler: async (req, res, next) => {
    const { uid: userId, list, id } = req.params;
    const animes = await Anime.findById(userId);

    if (!animes) {
      const newList = new Anime({
        anime_seen: [],
        anime_future: [],
        anime_liked: [],
        anime_watching: [],
      });

      return {
        status: 204,
      };
    }

    if (!animes[list]) {
      animes[list] = [];

      await animes.save();

      return {
        status: 204,
      };
    }

    animes[list] = animes[list].filter((a) => a.id !== id);

    await animes.save();

    return {
      status: 204,
    };
  },
};
