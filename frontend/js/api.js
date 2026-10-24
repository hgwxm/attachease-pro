// API 调用封装
const API = {
  baseUrl: '/api',

  async request(path, options = {}) {
    const token = auth.getToken();
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    const resp = await fetch(this.baseUrl + path, { ...options, headers });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(data.error || '请求失败');
    return data;
  },

  // 鉴权
  login(phone, password) {
    return this.request('/auth/login', { method: 'POST', body: JSON.stringify({ phone, password }) });
  },
  register(phone, password, name) {
    return this.request('/auth/register', { method: 'POST', body: JSON.stringify({ phone, password, name }) });
  },
  me() {
    return this.request('/auth/me');
  },

  // 商品
  listProducts(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.request('/products' + (qs ? '?' + qs : ''));
  },
  getProduct(id) {
    return this.request('/products/' + id);
  },
  createProduct(data) {
    return this.request('/products', { method: 'POST', body: JSON.stringify(data) });
  },
  buyProduct(id) {
    return this.request('/products/' + id + '/buy', { method: 'POST' });
  },
  myProducts() {
    return this.request('/products/mine');
  },

  // 管理员
  adminProducts() {
    return this.request('/admin/products');
  },
  updateProduct(id, data) {
    return this.request('/admin/products/' + id, { method: 'PUT', body: JSON.stringify(data) });
  },
  deleteProduct(id) {
    return this.request('/admin/products/' + id, { method: 'DELETE' });
  },
  adminUsers() {
    return this.request('/admin/users');
  }
};
