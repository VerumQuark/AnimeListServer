const { Anime } = require("../../models");

const SORT = {
  NAME: "NAME",
  RATING: "RATING",
};
const SORT_ORDER = {
  ASC: "ASC",
  DESC: "DESC",
};

const sortCondition = (sort = SORT.NAME, order = SORT_ORDER.ASC) => {
  switch (sort) {
    case SORT.NAME:
      return (a, b) => {
        switch (order) {
          case SORT_ORDER.ASC:
            return -1 * a.title.localeCompare(b);
          case SORT_ORDER.DESC:
            return a.title.localeCompare(b);
          default:
            return -1 * a.title.localeCompare(b);
        }
      };
    case SORT.RATING:
      return (a, b) => {
        switch (order) {
          case SORT_ORDER.ASC:
            return a.rating < b.rating ? -1 : 1;
          case SORT_ORDER.DESC:
            return a.rating < b.rating ? 1 : -1;
          default:
            return a.rating < b.rating ? 1 : -1;
        }
      };
  }
};

module.exports = {
  method: "get",
  route: "/animeLists/:id",
  handler: async (req, res, next) => {
    const userId = req.params.id;
    const { sort, sortOrder } = req.query;

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

    for (const key in animes.toJSON()) {
      const sortedArray = animes.toJSON()[key];
      try {
        sortedArray.sort(sortCondition(sort, sortOrder));
      } catch {
        continue;
      }
      animes[key] = sortedArray;
    }

    return {
      status: 200,
      data: animes,
    };
  },
};
