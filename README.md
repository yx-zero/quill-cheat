# 📝 Quill Auto Answer Script (Bookmarklet + Tampermonkey)

> 📌 A powerful userscript & bookmarklet tool that automatically fills in answers on [Quill.org](https://www.quill.org/) based on backend response data.

> 📌 一个强大的浏览器脚本/书签工具，能根据后台返回的数据自动填写 [Quill.org](https://www.quill.org/) 上的练习答案。

---

## ✅ Features | 功能亮点

- ✏️ Supports full-sentence questions (textarea based)
- 🧩 Supports fill-in-the-blank questions (single and multi-blank)
- ⚙️ Injects answers by parsing `/responses` network calls
- 🔄 Compatible with React/Vue bound inputs via native DOM events

- ✅ 支持整句题型（如主谓一致、句子改写）
- ✅ 支持多空填空题（多个空白自动填入）
- ✅ 通过监听 `/responses` 网络包提取正确答案
- ✅ 使用原生 DOM 接口触发事件，兼容各种前端框架

---

## 🔧 How to Use | 使用方法

### Method 1: Bookmarklet | 方法一：浏览器书签（轻量使用）

1. Create a bookmark in your browser.
2. Paste the bookmarklet code (from `bookmarklet.txt` or this repo) as the URL.
3. Go to https://www.quill.org/, click the bookmark **before** starting any exercise.

1. 创建一个浏览器书签
2. 将 `bookmarklet.txt` 中的代码粘贴进 URL 栏
3. 进入 Quill.org 并点击书签，再开始答题

> ⚠️ Must click the bookmarklet **before** the answers are loaded.
> ⚠️ 需要在题目加载前点击书签才能生效！

---

### Method 2: Tampermonkey Script | 方法二：浏览器脚本插件（推荐）

1. Install [Tampermonkey](https://www.tampermonkey.net/)
2. Create a new userscript
3. Paste in the code from `quill-auto.user.js` (in this repo)
4. Done! It auto-runs on any Quill.org page

1. 安装浏览器插件 [Tampermonkey](https://www.tampermonkey.net/)
2. 创建新脚本，粘贴 `quill-auto.user.js` 代码
3. 自动运行，无需手动点击
4. 稳定性高，适合长期使用

---

## 📷 Example | 示例截图

| Type 类型 | 自动填写效果 |
|-----------|--------------|
| Full sentence | ✅ 自动填写整句 |
| Fill-in-the-blanks | ✅ 自动识别每个空并填入 |

---

## ⚠️ Notes | 注意事项

- This tool is **for educational/personal use only**.
- Please do **not use to violate academic honesty policies**.
- Bookmarklet may not work if clicked too late. Use Tampermonkey for best results.

- 本脚本仅供个人学习使用，请勿用于违反学校纪律的用途。
- Bookmarklet 必须提前点击，推荐使用 Tampermonkey 插件以获得最稳定体验。

---

## 📄 License

MIT License. Feel free to fork, modify, or share with classmates!
