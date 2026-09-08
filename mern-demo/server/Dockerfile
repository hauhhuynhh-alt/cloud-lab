# Câu 32 (Base Image). Khai báo base image Node.js 
FROM node:18-alpine

# Câu 33 (Thư mục làm việc):. Tạo thư mục làm việc trong container
WORKDIR /app

# Câu 34 (Copy file cấu hình). Sao chép file khai báo thư viện
COPY package*.json ./

# Câu 35 (Cài phụ thuộc). Cài đặt các phụ thuộc (dependencies)
RUN npm install

# Câu 36 (Copy mã nguồn & Expose Port):. Sao chép toàn bộ mã nguồn backend vào container
COPY . .

#  cau 37 Mở cổng port (thường là 5000 cho Node backend)
EXPOSE 5000

# Câu 37 (Lệnh khởi động):. Lệnh chạy ứng dụng khi container khởi động
CMD ["npm", "start"]