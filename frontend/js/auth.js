// 鉴权工具
const auth = {
  getToken() {
    return localStorage.getItem('aep_token');
  },
  getUser() {
    const s = localStorage.getItem('aep_user');
    return s ? JSON.parse(s) : null;
  },
  setAuth(token, user) {
    localStorage.setItem('aep_token', token);
    localStorage.setItem('aep_user', JSON.stringify(user));
  },
  clearAuth() {
    localStorage.removeItem('aep_token');
    localStorage.removeItem('aep_user');
  },
  logout() {
    this.clearAuth();
    location.href = 'login.html';
  },
  // 检查登录，未登录跳转 login.html
  requireAuth() {
    if (!this.getToken()) {
      location.href = 'login.html';
      return false;
    }
    return true;
  },
  // 检查管理员
  requireAdmin() {
    const user = this.getUser();
    if (!user || user.role !== 'admin') {
      toast('无管理员权限', 'error');
      location.href = 'index.html';
      return false;
    }
    return true;
  }
};
