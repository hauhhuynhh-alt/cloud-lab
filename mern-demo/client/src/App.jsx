import { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);

  // State quản lý form nhập (dùng chung cho cả Thêm và Cập nhật)
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
  });

  // State lưu ID của sinh viên đang được chọn để chỉnh sửa (null nếu đang ở chế độ thêm mới)
  const [editingId, setEditingId] = useState(null);

  // Tự động nhận diện URL API cho môi trường Codespaces hoặc Localhost
  const API_URL = `${window.location.protocol}//${window.location.hostname.replace('-5173', '-5000')}/api/students`;

  // 1. Lấy danh sách sinh viên (GET /api/students)
  const fetchStudents = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error('Lỗi kết nối API:', err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Thay đổi giá trị trong các ô input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 2. Thêm mới hoặc Cập nhật sinh viên (POST / PUT)
  const handleSubmit = (e) => {
    e.preventDefault();

    const isEditing = Boolean(editingId);
    const url = isEditing ? `${API_URL}/${editingId}` : API_URL;
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Thao tác thất bại!');
        }
        return data;
      })
      .then(() => {
        alert(isEditing ? 'Cập nhật sinh viên thành công!' : 'Thêm sinh viên thành công!');
        handleResetForm();
        fetchStudents();
      })
      .catch((err) => {
        console.error('Lỗi:', err);
        alert(`Lỗi: ${err.message}`);
      });
  };

  // 3. Xóa sinh viên (DELETE /api/students/:id)
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Xóa thất bại!');
          return data;
        })
        .then(() => {
          alert('Đã xóa sinh viên thành công!');
          fetchStudents();
        })
        .catch((err) => alert(`Lỗi khi xóa: ${err.message}`));
    }
  };

  // 4. Chọn sinh viên để sửa
  const handleEdit = (student) => {
    setEditingId(student._id);
    setFormData({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
    });
  };

  // Reset form về trạng thái ban đầu
  const handleResetForm = () => {
    setFormData({ studentId: '', name: '', email: '' });
    setEditingId(null);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h2>{editingId ? 'Cập Nhật Thông Tin Sinh Viên' : 'Thêm Sinh Viên Mới'}</h2>
      
      {/* Form nhập dữ liệu */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        <div>
          <label>Mã SV: </label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Nhập mã sinh viên..."
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>

        <div>
          <label>Họ và Tên: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập họ tên..."
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>

        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email..."
            required
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: editingId ? '#28a745' : '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: 1,
            }}
          >
            {editingId ? 'Cập Nhật Sinh Viên' : 'Thêm Sinh Viên'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleResetForm}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      <h2>Danh Sách Sinh Viên</h2>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Mã SV</th>
            <th>Họ và Tên</th>
            <th>Email</th>
            <th style={{ textAlign: 'center' }}>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => handleEdit(student)}
                    style={{ marginRight: '8px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>Chưa có sinh viên nào trong dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;