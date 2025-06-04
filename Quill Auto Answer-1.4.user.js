// ==UserScript==
// @name         Quill Auto Answer (Feedback Match in Any Item)
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Autofill Quill answers only if one item has strong feedback
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

        const requiredFeedback = `<p>That&#x27;s a strong sentence!</p>`;

        const matchItem = json.find(item => item?.feedback === requiredFeedback && item?.text);
        if (!matchItem) {
          console.warn('[Quill Auto] No matching feedback found in any response. Skipping autofill.');
          return response;
        }

        const fullAnswer = matchItem.text;
        console.log('[Quill Auto] Matched answer text:', fullAnswer);

        // contenteditable div
        const contentDiv = document.querySelector('.connect-text-area[contenteditable="true"]');
        if (contentDiv) {
          forceSetInputValue(contentDiv, fullAnswer);
          console.log('[Quill Auto] Filled contenteditable input.');
        }

        // fill-in-the-blank input
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

  function escapeReg(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function forceSetInputValue(input, value) {
    if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
      const setter = Object.getOwnPropertyDescriptor(input.__proto__, 'value').set;
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
