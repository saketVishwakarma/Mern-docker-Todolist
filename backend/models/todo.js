const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Todo', TodoSchema);
