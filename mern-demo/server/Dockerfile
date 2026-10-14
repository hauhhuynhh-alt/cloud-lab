# Base Image cho Client
FROM node:18-alpine

# Thư mục làm việc
WORKDIR /app

# Sao chép package.json và cài đặt thư viện
COPY package*.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn client
COPY . .

# KHAI BÁO BIẾN MÔI TRƯỜNG BUILD-TIME CHO VITE
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build ứng dụng tĩnh
RUN npm run build

# Sử dụng serve để chạy ứng dụng
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]