const Task = require("../models/Task");
const asyncWrapper = require("../middleware/asynWrapper");
const { createCustomError } = require("../errors/customError");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  return task
    ? res.status(200).json({ task })
    : next(createCustomError("Not Found", 404));
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json([task]);
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true
  });

  return task
    ? res.status(200).json({ task })
    : res.status(404).json({ error: { msg: `No task with id ${taskId}` } });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOneAndDelete({ _id: taskId });

  return task
    ? res.status(204).json()
    : res.status(404).json({ error: { msg: `No task with id ${taskId}` } });
});

//batch api
// const createTasks = (req, res) => {
//   res.json({ tasks: "all tasks" });
// };

// const deleteTasks = (req, res) => {
//   res.json({ tasks: "all tasks" });
// };

// const updateTasks = (req, res) => {
//   res.json({ tasks: "all tasks" });
// };

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
