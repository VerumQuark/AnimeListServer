const { Anime } = require("../../models");

module.exports = {
  method: "delete",
  route: "/animeLists/:uid/:list",
  handler: async (req, res, next) => {
    const { uid: userId, list } = req.params;
    const { itemsIdToDelete } = req.body
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

      await Anime.findOneAndUpdate({_id: userId}, {[list]: []});

      return {
        status: 204,
      };
    }

    await Anime.findOneAndUpdate({
      _id: userId},
       {[list]: animes[list].filter((a) => !itemsIdToDelete.includes(a.id))});

    return {
      status: 204,
    };
  },
};
