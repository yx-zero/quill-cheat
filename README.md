# 📝 Quill Auto Answer (v1.7)

**Automatically fill in answers on [Quill.org](https://www.quill.org/) using real-time response interception.**  
Supports sentence-based and fill-in-the-blank questions with high reliability.

📁 Files included:
- `Quill Auto Answer-1.7.bookmark.js` – One-line **bookmarklet** version (for casual use)
- `Quill Auto Answer-1.7.user.js` – Full **Tampermonkey script** (recommended)

> 📘 [View in 中文 / 中文版说明 →](./README.zh.md)

---

## ✅ Features

- Works on both sentence and multi-blank questions
- Extracts answers from `/responses` API call
- Fills all inputs using native DOM events
- No backend access or credential tampering involved

---

## 🔧 Option 1: Bookmarklet

1. Open `Quill Auto Answer-1.7.bookmark.js`
2. Copy the one-liner code inside
3. Create a new browser bookmark and paste it into the URL field
4. Go to https://www.quill.org/ and click the bookmark **before** starting the question

⚠️ Bookmarklet must be triggered before the question loads.

---

## 🧩 Option 2: Tampermonkey Script (Recommended)

1. Install [Tampermonkey](https://tampermonkey.net)
2. Open `Quill Auto Answer-1.7.user.js`
3. Paste into a new Tampermonkey script
4. Automatically runs when visiting Quill.org exercises

---

## 📸 Preview

| Type                 | Auto-filled? |
|----------------------|--------------|
| Full sentence        | ✅ Yes       |
| Multi-blank (inputs) | ✅ Yes       |

---

## ⚠️ Disclaimer

This script is intended for educational, research, and demonstration purposes only.  
Please do not use it to violate any academic integrity policies or classroom expectations.

---

## 📜 License

MIT License. Contributions welcome.
