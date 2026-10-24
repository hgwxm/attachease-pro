# AttachEase Pro · 二手交易平台

> 前后端分离的二手物品交易平台，含登录鉴权、商品发布、担保购买、管理员后台。

## 🚀 快速开始

```bash
# 1. 安装后端依赖
cd backend
npm install

# 2. 启动服务器
npm start

# 3. 打开浏览器访问
# http://localhost:3000  （自动跳转到登录页）
```

## 🔑 默认账号

| 角色 | 手机号 | 密码 |
|------|--------|------|
| 普通用户 | `13800138000` | `123456` |
| 管理员 | `13900139000` | `admin123` |

## 📁 项目结构

```
attachease-pro/
├── frontend/                    # 前端（HTML + CSS + JS）
│   ├── login.html               # 登录/注册页（进入先登录）
│   ├── index.html               # 首页（商品列表 + 搜索 + 分类）
│   ├── publish.html             # 发布二手商品
│   ├── product.html             # 商品详情 + 购买
│   ├── admin.html               # 管理员后台（审核/删除/用户管理）
│   ├── css/style.css            # 共用样式
│   └── js/
│       ├── api.js               # 后端 API 调用封装
│       ├── auth.js              # 登录状态 + 鉴权
│       └── common.js            # 通用工具
├── backend/                     # 后端（Node.js + Express）
│   ├── server.js                # Express 入口
│   ├── routes/
│   │   ├── auth.js              # 登录/注册 API
│   │   ├── products.js          # 商品 CRUD + 购买
│   │   └── admin.js             # 管理员 API
│   ├── data/
│   │   ├── users.json           # 用户数据
│   │   └── products.json        # 商品数据
│   └── package.json
└── README.md
```

## 🧩 功能清单

| 功能 | 说明 |
|------|------|
| 🔐 登录/注册 | 手机号 + 密码，进入系统必须先登录 |
| 🏠 首页 | 商品瀑布流、搜索、分类筛选、排序 |
| 📦 发布二手 | 表单发布，提交后进入待审核状态 |
| 🛒 商品详情/购买 | 查看详情、担保交易购买 |
| ⚙️ 管理员后台 | 商品审核（通过/拒绝）、删除商品、用户列表 |
| 📱 响应式 | 桌面/平板/移动端自适应，移动端底部 Tab 栏 |

## 🔌 API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/auth/login` | POST | 登录 |
| `/api/auth/register` | POST | 注册 |
| `/api/auth/me` | GET | 获取当前用户 |
| `/api/products` | GET | 商品列表（?search=&category=&sort=） |
| `/api/products/:id` | GET | 商品详情 |
| `/api/products` | POST | 发布商品（需登录） |
| `/api/products/:id/buy` | POST | 购买商品（需登录） |
| `/api/admin/products` | GET | 管理员：全部商品 |
| `/api/admin/products/:id` | PUT | 管理员：审核/更新 |
| `/api/admin/products/:id` | DELETE | 管理员：删除 |
| `/api/admin/users` | GET | 管理员：用户列表 |

## 🛠️ 技术栈

- **前端**：原生 HTML / CSS / JavaScript（无框架，轻量）
- **后端**：Node.js + Express
- **数据存储**：JSON 文件（开箱即用，无需数据库）
- **设计系统**：主色 #1677FF，响应式栅格，WCAG 2.1 AA

## 📄 许可证

MIT
