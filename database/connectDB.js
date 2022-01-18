const mongoose = require("mongoose");

const connectToDatabase = (uri) => {
  return mongoose.connect(uri);
};

module.exports = connectToDatabase;
