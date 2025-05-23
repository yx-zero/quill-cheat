/*
 * Quill Auto Answer (Bookmarklet + Tampermonkey)
 * ==============================================
 *
 * Quill Auto Answer is a browser script that auto-fills answers for exercises on Quill.org.
 * It extracts answers from network responses and inserts them into the correct input fields.
 *
 * ✅ Supports:
 * - Full sentence completion (textarea)
 * - Multi-blank fill-ins (input fields)
 *
 * 🔧 Installation — Method 1: Bookmarklet
 * ---------------------------------------
 * 1. Create a new browser bookmark.
 * 2. Paste the full JavaScript one-liner provided in this repo as the bookmark URL.
 * 3. Open https://www.quill.org/ and click the bookmark before starting any exercise.
 *
 * 🔧 Installation — Method 2: Tampermonkey (Recommended)
 * -------------------------------------------------------
 * 1. Install the Tampermonkey browser extension.
 * 2. Create a new userscript and paste in the content from quill-auto.user.js
 * 3. It will run automatically whenever you open Quill exercises.
 *
 * ❗ Notes:
 * - Bookmarklet must be clicked before answers are loaded.
 * - Tampermonkey method is more reliable and recommended.
 * - Intended for educational and personal use only.
 */
