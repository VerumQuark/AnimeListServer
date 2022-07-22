module.exports = function errorMiddleware (err, req, res, next) {
  switch(err.name) {
    case "NOTCREATED":
      return res.status(401).json({error: error.name, message: error.message});
    case "NOTFOUND":
      return res.status(404).json({error: error.name, message: error.message});
    case "CONFLICT":
      return res.status(409).json({error: error.name, message: error.message});
    default:
      return res.status(500).send("UNDEFINED ERROR")
  }
}