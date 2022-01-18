const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    maxlength: [255, "name cannot be longer than 255 chars"]
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Task", TaskSchema);
