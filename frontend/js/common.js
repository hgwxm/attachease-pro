// 通用工具
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

// Toast 提示
function toast(msg, type = '') {
  const el = document.createElement('div');
  el.className = 'toast' + (type ? ' toast-' + type : '');
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

// 价格格式化
function formatPrice(p) {
  return '¥' + Number(p).toLocaleString('zh-CN');
}

// 时间格式化
function formatTime(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = (now - d) / 1000;
  if (diff < 60) return '刚刚';
  if (diff < 3600) return Math.floor(diff / 60) + '分钟前';
  if (diff < 86400) return Math.floor(diff / 3600) + '小时前';
  if (diff < 2592000) return Math.floor(diff / 86400) + '天前';
  return d.toLocaleDateString('zh-CN');
}

// URL 查询参数
function getQuery(key) {
  return new URLSearchParams(location.search).get(key);
}

// 转义 HTML
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// 渲染商品卡片
function productCard(p) {
  return `<div class="product-card" onclick="location.href='product.html?id=${p.id}'">
    <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" onerror="this.src='https://picsum.photos/seed/${p.id}/600/450'">
    <div class="product-card-body">
      <div class="product-card-title">${escapeHtml(p.title)}</div>
      <div class="product-card-price">${formatPrice(p.price)}</div>
      <div class="product-card-meta"><span>${escapeHtml(p.category)} · ${escapeHtml(p.condition)}</span><span>${formatTime(p.createdAt)}</span></div>
    </div>
  </div>`;
}

// 渲染导航栏
function renderNavbar() {
  const user = auth.getUser();
  const links = user
    ? `<a href="publish.html">发布二手</a>${user.role === 'admin' ? '<a href="admin.html">管理后台</a>' : ''}<button onclick="auth.logout()">退出 (${escapeHtml(user.name)})</button>`
    : '<a href="login.html">登录</a>';
  return `<nav class="navbar"><div class="navbar-inner">
    <a href="index.html" class="navbar-logo">AttachEase Pro</a>
    <div class="navbar-search"><input id="navSearch" placeholder="搜索二手好物..." onkeydown="if(event.key==='Enter')location.href='index.html?search='+this.value"></div>
    <div class="navbar-links">${links}</div>
  </div></nav>`;
}

// 渲染移动端 Tab 栏
function renderTabbar(active) {
  const tabs = [
    { href: 'index.html', icon: '🏠', label: '首页', key: 'home' },
    { href: 'publish.html', icon: '➕', label: '发布', key: 'publish' },
    { href: 'login.html', icon: '👤', label: '我的', key: 'me' }
  ];
  return `<div class="mobile-tabbar">${tabs.map(t => `<a href="${t.href}" class="${active === t.key ? 'active' : ''}"><span>${t.icon}</span><span>${t.label}</span></a>`).join('')}</div>`;
}
