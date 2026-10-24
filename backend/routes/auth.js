const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFile = path.join(__dirname, '../data/users.json');

function readUsers() {
  return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
}
function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// 简单 token：base64(token_userId_timestamp)
function makeToken(userId) {
  return Buffer.from(`token_${userId}_${Date.now()}`).toString('base64');
}
function parseToken(token) {
  const decoded = Buffer.from(token, 'base64').toString();
  return parseInt(decoded.split('_')[1]);
}

// 登录
router.post('/login', (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) return res.status(400).json({ error: '请输入手机号和密码' });
  const users = readUsers();
  const user = users.find(u => u.phone === phone && u.password === password);
  if (!user) return res.status(401).json({ error: '手机号或密码错误' });
  const token = makeToken(user.id);
  res.json({
    token,
    user: { id: user.id, name: user.name, phone: user.phone, role: user.role, credit: user.credit }
  });
});

// 注册
router.post('/register', (req, res) => {
  const { phone, password, name } = req.body;
  if (!phone || !password) return res.status(400).json({ error: '手机号和密码必填' });
  if (!/^1\d{10}$/.test(phone)) return res.status(400).json({ error: '手机号格式不正确' });
  const users = readUsers();
  if (users.find(u => u.phone === phone)) return res.status(400).json({ error: '该手机号已注册' });
  const newUser = {
    id: Date.now(),
    phone, password,
    name: name || '新用户' + phone.slice(-4),
    role: 'user',
    credit: 100,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  writeUsers(users);
  const token = makeToken(newUser.id);
  res.json({
    token,
    user: { id: newUser.id, name: newUser.name, phone: newUser.phone, role: newUser.role, credit: newUser.credit }
  });
});

// 获取当前用户
router.get('/me', (req, res) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: '未登录' });
  try {
    const userId = parseToken(token);
    const user = readUsers().find(u => u.id === userId);
    if (!user) return res.status(401).json({ error: '用户不存在' });
    res.json({ id: user.id, name: user.name, phone: user.phone, role: user.role, credit: user.credit });
  } catch (e) {
    res.status(401).json({ error: 'token 无效' });
  }
});

module.exports = router;
