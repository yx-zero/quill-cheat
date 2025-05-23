# 📝 Quill Auto Answer (v1.1)

**Automatically fill in answers on [Quill.org](https://www.quill.org/) using real-time response interception.**  
Supports sentence-based and blank-fill questions with high reliability.

📁 Files included:
- `Quill Auto Answer-1.1.bookmark.js` – One-line **bookmarklet** version (for casual use)
- `Quill Auto Answer-1.1.user.js` – Full **Tampermonkey script** (recommended)

👉 [Jump to 中文版说明 ⬇](#中文版说明)

---

## ✨ Features

- ✅ Works with both sentence and fill-in-the-blank questions
- 🧠 Detects answers from network response data
- 🚀 No API key, injection, or hacking – just smart automation
- ⚙️ Supports multiple blanks, re-uses, and edge cases
- 💻 Designed for both Bookmarklet and Tampermonkey use

---

## 🔧 Option 1: Bookmarklet (drag-and-drop style)

1. Open the file `Quill Auto Answer-1.1.bookmark.js`
2. Copy the one-liner code inside
3. Create a new bookmark in your browser and paste the code as the URL
4. Go to https://www.quill.org/, then click the bookmark **before** starting an exercise

⚠️ You must click the bookmark **before** the question loads. For better reliability, use Tampermonkey.

---

## 🧩 Option 2: Tampermonkey Script (recommended)

1. Install [Tampermonkey](https://tampermonkey.net) extension
2. Open the file `Quill Auto Answer-1.1.user.js`
3. Paste the code into a new userscript in Tampermonkey
4. It will auto-run on every Quill.org exercise page

✅ Best for permanent use – works even if you refresh or open new tabs.

---

## 📸 Preview

| Type               | Screenshot                        |
|--------------------|-----------------------------------|
| Sentence Completion | ✅ Auto-filled from network packet |
| Fill-in-the-blank   | ✅ Correct word filled per blank   |

---

## ⚠️ Disclaimer

This tool is for educational and demo purposes only.  
Do not use in ways that violate your school’s or teacher’s rules.

---

## 📜 License

MIT License. Contributions welcome.

---

# 🇨🇳 中文版说明

**Quill 自动答题工具 v1.1**

自动识别 Quill.org 网站练习题答案，并填入输入框。支持整句题和多空题。

📁 文件说明：
- `Quill Auto Answer-1.1.bookmark.js`：书签版（适合临时使用）
- `Quill Auto Answer-1.1.user.js`：Tampermonkey 插件脚本（推荐使用）

---

## ✨ 功能亮点

- ✅ 支持整句题、多个空填空题
- 🔍 从网络请求中提取真实答案
- ⚙️ 自动模拟真实输入，无需额外 API
- 🔁 支持多个空、重复单词

---

## 🔧 用法一：书签 Bookmarklet

1. 打开 `Quill Auto Answer-1.1.bookmark.js`
2. 将其中一行代码复制粘贴到新书签的 URL
3. 进入 quill.org，**在题目加载前点击书签**

⚠️ 若点击太晚将无法获取答案，推荐使用 Tampermonkey。

---

## 🧩 用法二：Tampermonkey 插件脚本（推荐）

1. 安装浏览器插件 [Tampermonkey](https://tampermonkey.net)
2. 打开 `Quill Auto Answer-1.1.user.js` 文件
3. 粘贴代码并保存，进入 quill.org 自动运行，无需手动点击

---

## 🖼️ 示例截图

- 整句题 ✅ 自动填入完整答案
- 多空题 ✅ 精准拆词填入每个空

---

## ⚠️ 注意事项

本脚本仅供学习使用。请勿违反课堂纪律或学术诚信。

---

## 📜 开源协议

MIT License，自由修改使用。
