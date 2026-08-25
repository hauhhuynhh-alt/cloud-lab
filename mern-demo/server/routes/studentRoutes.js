const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET /api/students - Lấy danh sách sinh viên cau 36
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/students - Thêm sinh viên mới Cau 37
router.post('/', async (req, res) => {
  const student = new Student({
    studentId: req.body.studentId, // Đảm bảo dùng studentId
    name: req.body.name,
    email: req.body.email
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/students/:id - Cập nhật sinh viên
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        studentId: req.body.studentId,
        name: req.body.name,
        email: req.body.email
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    }

    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/students/:id - Xóa sinh viên cau 39
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa sinh viên thành công' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;