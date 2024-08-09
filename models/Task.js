const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: 
  { type: Date,
     required: true 
    },
  status: { 
    type: String,
     default: "pending"
     },
  
   priority: {
     type: String,
     required: true
     },
  user: 
  { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User"
   },
});

module.exports = mongoose.model("Task", TaskSchema);
