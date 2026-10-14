const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Cấu hình CORS linh hoạt cho Production
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true); // Hoặc từ chối bằng cách truyền Error
    }
  },
  credentials: true
}));

app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Kết nối MongoDB Atlas thành công!"))
  .catch(err => console.error("Lỗi kết nối MongoDB:", err));

// Test Route
app.get('/api/hello', (req, res) => {
  res.json({ message: "Backend đang hoạt động!" });
});

// Khai báo Student Routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));