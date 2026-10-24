const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

// API 路由
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

// 托管前端静态文件
app.use(express.static(path.join(__dirname, '../frontend')));

// 根路径跳转到登录页
app.get('/', (req, res) => res.redirect('/login.html'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AttachEase Pro 服务已启动: http://localhost:${PORT}`);
  console.log(`默认账号 - 普通用户: 13800138000 / 123456`);
  console.log(`默认账号 - 管理员:   13900139000 / admin123`);
});
