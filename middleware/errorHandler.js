const { CustomError } = require("../errors/customError");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  return err instanceof CustomError
    ? res.status(err.statusCode).json({ error: err })
    : res.status(500).json({ error: err });
};

module.exports = errorHandler;
