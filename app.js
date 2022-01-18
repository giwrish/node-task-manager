const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks");
const connectToDatabase = require("./database/connectDB");
require("dotenv").config();
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandler);

const port = 3000;

const startServer = async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
