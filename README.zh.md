# 📝 Quill 自动答题工具（v1.1）

基于浏览器网络数据自动提取并填写 [Quill.org](https://www.quill.org/) 网站练习的正确答案。  
支持整句题、多空题等场景，兼容性高，使用稳定。

📁 包含文件：
- `Quill Auto Answer-1.1.bookmark.js`：书签脚本（轻量使用）
- `Quill Auto Answer-1.1.user.js`：Tampermonkey 用户脚本（推荐）

---

## ✅ 功能说明

- ✅ 支持整句题与多空填空题
- ✅ 自动监听 `/responses` 接口获得答案
- ✅ 自动触发输入事件，兼容 Quill 前端框架
- ✅ 无需后端权限，无需破解，仅为页面逻辑自动化

---

## 🔧 方法一：书签脚本 Bookmarklet

1. 打开 `Quill Auto Answer-1.1.bookmark.js`
2. 复制其中的一行代码
3. 创建浏览器书签，把代码粘贴进 URL 栏
4. 访问 https://www.quill.org/ 并在题目加载前点击书签

⚠️ 题目加载后再点击可能失效，请提前触发脚本。

---

## 🧩 方法二：Tampermonkey 插件脚本（推荐）

1. 安装浏览器插件 [Tampermonkey](https://tampermonkey.net)
2. 打开 `Quill Auto Answer-1.1.user.js`
3. 新建脚本并粘贴代码
4. 每次打开 Quill 网站会自动运行

---

## 📷 示例效果

| 题型         | 自动填写 |
|--------------|----------|
| 整句题        | ✅ 是     |
| 多空填空题     | ✅ 是     |

---

## ⚠️ 使用声明

本脚本仅用于学习研究用途，禁止用于违反学校纪律或学术诚信的场景。  
请自行对使用行为负责。

---

## 📜 开源协议

MIT License。欢迎改进、转发与学习交流。
