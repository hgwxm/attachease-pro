const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const productsFile = path.join(__dirname, '../data/products.json');
const usersFile = path.join(__dirname, '../data/users.json');

function readProducts() {
  return JSON.parse(fs.readFileSync(productsFile, 'utf8'));
}
function writeProducts(products) {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}
function readUsers() {
  return JSON.parse(fs.readFileSync(usersFile, 'utf8'));
}
function parseToken(token) {
  const decoded = Buffer.from(token, 'base64').toString();
  return parseInt(decoded.split('_')[1]);
}
function getCurrentUser(req) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return null;
  try {
    const userId = parseToken(token);
    return readUsers().find(u => u.id === userId) || null;
  } catch { return null; }
}

// 商品列表（搜索/分类/排序）
router.get('/', (req, res) => {
  const { search, category, sort } = req.query;
  let products = readProducts().filter(p => p.status === 'approved' && !p.sold);
  if (search) {
    const kw = search.toLowerCase();
    products = products.filter(p => p.title.toLowerCase().includes(kw) || p.description.toLowerCase().includes(kw));
  }
  if (category && category !== '全部') products = products.filter(p => p.category === category);
  if (sort === 'price-asc') products.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') products.sort((a, b) => b.price - a.price);
  else if (sort === 'newest') products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(products);
});

// 我发布的商品（需登录）
router.get('/mine', (req, res) => {
  const user = getCurrentUser(req);
  if (!user) return res.status(401).json({ error: '请先登录' });
  const products = readProducts().filter(p => p.sellerId === user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(products);
});

// 商品详情
router.get('/:id', (req, res) => {
  const product = readProducts().find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: '商品不存在' });
  res.json(product);
});

// 发布商品（需登录）
router.post('/', (req, res) => {
  const user = getCurrentUser(req);
  if (!user) return res.status(401).json({ error: '请先登录' });
  const { title, price, description, category, condition, image } = req.body;
  if (!title || !price) return res.status(400).json({ error: '标题和价格必填' });
  const products = readProducts();
  const newProduct = {
    id: Date.now(),
    title,
    price: Number(price),
    description: description || '',
    category: category || '其他',
    condition: condition || '未填写',
    image: image || 'https://picsum.photos/seed/' + Date.now() + '/600/450',
    sellerId: user.id,
    sellerName: user.name,
    status: 'pending',
    sold: false,
    createdAt: new Date().toISOString()
  };
  products.push(newProduct);
  writeProducts(products);
  res.json(newProduct);
});

// 购买商品
router.post('/:id/buy', (req, res) => {
  const user = getCurrentUser(req);
  if (!user) return res.status(401).json({ error: '请先登录' });
  const products = readProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: '商品不存在' });
  if (product.sold) return res.status(400).json({ error: '商品已售出' });
  if (product.sellerId === user.id) return res.status(400).json({ error: '不能购买自己的商品' });
  product.sold = true;
  product.buyerId = user.id;
  product.buyerName = user.name;
  product.soldAt = new Date().toISOString();
  writeProducts(products);
  res.json({ success: true, message: '购买成功，卖家会尽快联系你', product });
});

module.exports = router;
