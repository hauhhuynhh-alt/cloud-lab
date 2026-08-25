const mongoose = require('mongoose');

// Định nghĩa Schema cho Sinh viên theo yêu cầu Câu 35
const studentSchema = new mongoose.Schema({
  studentId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);