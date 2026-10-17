# AttachEase Pro · 二手交易平台 Web 原型

> 基于产品需求文档（PRD）实现的响应式单页 Web 原型，双击即可在浏览器中运行，无需任何构建环境。

## ✨ 项目简介

AttachEase Pro 是一个面向校园 / 社区的二手物品交易平台响应式 Web 原型。本仓库为**可交互的前端原型**，用单文件 HTML + CSS + JS 完整还原了 PRD 中 13 项核心功能需求（FR-01 ~ FR-13）的交互流程，用于产品演示与需求确认。

## 🚀 快速开始

```bash
# 方式一：直接双击打开
attachease-pro.html

# 方式二：本地起服务（可选）
python -m http.server 8080
# 浏览器访问 http://localhost:8080/attachease-pro.html
```

## 📦 文件结构

```
attachease-pro/
├── attachease-pro.html   # 单文件完整原型（HTML + CSS + JS 内联，87KB）
├── README.md
└── .gitignore
```

## 🧩 功能清单（对应 PRD 13 项 FR）

| 编号 | 功能 | 优先级 | 原型支持 |
|------|------|--------|----------|
| FR-01 | 手机号 + 短信验证码登录 | P0 | ✅ 登录弹窗 + 60s 倒计时 |
| FR-02 | 发布商品（多图 / 分类 / 成色） | P0 | ✅ 发布表单 + 草稿自动保存 |
| FR-03 | 搜索 + 分类 + 排序 + 筛选 | P0 | ✅ |
| FR-04 | 商品详情 + 收藏 | P0 | ✅ 图片画廊 + 卖家信用 |
| FR-05 | 即时通讯 + 敏感词检测 | P1 | ✅ 电话/微信/QQ/转账自动拦截 |
| FR-06 | 担保交易 + 订单状态机 | P0 | ✅ created→paid→shipped→confirmed→settled→reviewed |
| FR-07 | 物流单号 + 收货确认 | P1 | ✅ |
| FR-08 | 评价 + 信用分 | P1 | ✅ |
| FR-09 | 退款 / 退货流程 | P1 | ✅ |
| FR-10 | 站内通知 | P2 | ✅ |
| FR-11 | 后台审核 / 风控 | P2 | ✅ |
| FR-12 | 个性化推荐 | P2 | ✅ |
| FR-13 | 首页 / 活动页 | P0 | ✅ 信任栏 + 商品瀑布流 |

## 🎨 设计系统

- **主色**：`#1677FF`（Ant Design 蓝）
- **圆角**：8–12px
- **响应式栅格**：桌面 4 列 / 平板 3 列 / 移动 2 列
- **移动端**：底部 Tab 栏（首页 / 发布 / 消息 / 我的）
- **无障碍**：遵循 WCAG 2.1 AA

## 🛠️ 技术栈

| 层 | 原型（本仓库） | PRD 目标实现 |
|----|----------------|--------------|
| 前端 | 原生 HTML / CSS / JS（单文件） | React 18 + Ant Design |
| 后端 | — | Node.js + Express |
| 数据库 | — | PostgreSQL |
| 存储 / CDN | — | 对象存储 + CDN |

## 🌐 在线预览

临时公开链接（通过 serveo.net 隧道，本机在线期间可用）：

```
https://9870ee59e3b158e0-112-2-255-112.serveousercontent.com/attachease-pro.html
```

> 如需永久固定链接，建议启用 GitHub Pages：仓库 **Settings → Pages → Source: main 分支 / root**，即可获得 `https://<用户名>.github.io/attachease-pro/attachease-pro.html`。

## 📄 许可证

MIT
