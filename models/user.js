const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  rollNo: String,
  name: String,
  college: String,
  department: String,
  city: String,
})

module.exports = mongoose.model("Student", studentSchema);