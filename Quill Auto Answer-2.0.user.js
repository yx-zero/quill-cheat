// ==UserScript==
// @name         Quill Auto Answer (Strict Match + Well Done) - Fixed for Textarea
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Autofill Quill answers if feedback matches known good responses (works with textarea)
// @match        https://www.quill.org/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const origFetch = window.fetch;
  window.fetch = async function (...args) {
    const response = await origFetch(...args);

    try {
      const url = args[0];
      if (typeof url === 'string' && url.includes('/responses')) {
        const clone = response.clone();
        const json = await clone.json();

        if (!Array.isArray(json)) return response;

        const isStrongFeedback = (raw) => {
          const decoded = decodeHtml(raw).trim();
          return decoded === "That's a strong sentence!" ||
                 decoded === "Well done! That's the correct answer." ||
                 decoded === "That's a strong answer!";
        };

        const matchItem = json.find(item =>
          item?.feedback && item?.text && isStrongFeedback(item.feedback)
        );

        if (!matchItem) {
          console.warn('[Quill Auto] No valid feedback match found. Skipping autofill.');
          return response;
        }

        const fullAnswer = matchItem.text;
        console.log('[Quill Auto] Matched answer text:', fullAnswer);

        // ✅ support for textarea.connect-text-area
        const contentInput =
          document.querySelector('textarea.connect-text-area') ||
          document.querySelector('[contenteditable="true"].input-field') ||
          document.querySelector('[contenteditable="true"].connect-text-area');

        if (contentInput) {
          forceSetInputValue(contentInput, fullAnswer);
          console.log('[Quill Auto] Filled input/textarea.');
        }

        // fill-in-the-blank inputs
        const inputs = document.querySelectorAll('input.fill-in-blank-input');
        if (inputs.length > 0) {
          let sentenceFragments = [];
          inputs.forEach(input => {
            const before = input.previousSibling?.textContent?.trim() || '';
            const after = input.nextSibling?.textContent?.trim() || '';
            sentenceFragments.push({ input, before, after });
          });

          for (const { input, before, after } of sentenceFragments) {
            const regex = new RegExp(`${escapeReg(before)}\\s+(\\S+?)\\s+${escapeReg(after)}`, 'i');
            const match = fullAnswer.match(regex);
            if (match && match[1]) {
              forceSetInputValue(input, match[1]);
              console.log(`[Quill Auto] Filled blank: "${match[1]}"`);
            } else {
              console.warn(`[Quill Auto] Could not find match between "${before}" and "${after}"`);
            }
          }
        }
      }
    } catch (e) {
      console.warn('[Quill Auto] Error:', e);
    }

    return response;
  };

  function decodeHtml(html) {
    const el = document.createElement('div');
    el.innerHTML = html;
    return el.textContent || el.innerText || '';
  }

  function escapeReg(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function forceSetInputValue(input, value) {
    if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
      const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value').set;
      setter.call(input, value);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (input.isContentEditable) {
      input.focus();
      document.execCommand('selectAll');
      document.execCommand('delete');
      document.execCommand('insertText', false, value);
    } else {
      console.warn('[Quill Auto] Unsupported input type:', input);
    }
  }
})();
