module.exports = function errorMiddleware(err, req, res, next) {
  const error = {
    error: err.name,
    message: err.message,
  };

  switch (err.name) {
    case "NOTCREATED":
      return res.status(401).json(error);
    case "NOTFOUND":
      return res.status(404).json(error);
    case "CONFLICT":
      return res.status(409).json(error);
    default:
      console.error(err);
      return res.status(500).send("UNDEFINED ERROR");
  }
};
