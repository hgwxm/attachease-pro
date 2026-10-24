const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const productsFile = path.join(__dirname, '../data/products.json');
const usersFile = path.join(__dirname, '../data/users.json');

function readProducts() {
  return JSON.parse(fs.readFileSync(productsFile, 'utf8'));
}
function writeProducts(p) {
  fs.writeFileSync(productsFile, JSON.stringify(p, null, 2));
}
function readUsers() {
  return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
}
function parseToken(token) {
  const decoded = Buffer.from(token, 'base64').toString();
  return parseInt(decoded.split('_')[1]);
}

// 管理员鉴权中间件
function adminAuth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: '请先登录' });
  try {
    const userId = parseToken(token);
    const user = readUsers().find(u => u.id === userId);
    if (!user || user.role !== 'admin') return res.status(403).json({ error: '无管理员权限' });
    req.adminUser = user;
    next();
  } catch {
    res.status(401).json({ error: 'token 无效' });
  }
}

// 商品列表（含待审核/已售）
router.get('/products', adminAuth, (req, res) => {
  res.json(readProducts());
});

// 审核/更新商品状态
router.put('/products/:id', adminAuth, (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: '商品不存在' });
  Object.assign(product, req.body);
  writeProducts(products);
  res.json(product);
});

// 删除商品
router.delete('/products/:id', adminAuth, (req, res) => {
  let products = readProducts();
  const before = products.length;
  products = products.filter(p => p.id !== parseInt(req.params.id));
  if (products.length === before) return res.status(404).json({ error: '商品不存在' });
  writeProducts(products);
  res.json({ success: true });
});

// 用户列表
router.get('/users', adminAuth, (req, res) => {
  res.json(readUsers().map(u => ({
    id: u.id, name: u.name, phone: u.phone, role: u.role, credit: u.credit, createdAt: u.createdAt
  })));
});

module.exports = router;
