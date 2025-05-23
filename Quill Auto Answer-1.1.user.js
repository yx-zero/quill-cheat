// ==UserScript==
// @name         Quill Auto Answer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  autofill answers in quill
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
        if (!Array.isArray(json) || !json[0]?.text) return response;

        const fullAnswer = json[0].text;
        console.log('[Quill Auto] Full answer text:', fullAnswer);

        const singleInput = document.querySelector('textarea.connect-text-area');
        if (singleInput) {
          forceSetInputValue(singleInput, fullAnswer);
          console.log('[Quill Auto] Filled full sentence.');
        }

        const inputs = document.querySelectorAll('input.fill-in-blank-input');
        if (inputs.length > 0) {
          let sentenceFragments = [];
          inputs.forEach(input => {
            const before = input.previousSibling?.textContent?.trim() || '';
            const after = input.nextSibling?.textContent?.trim() || '';
            sentenceFragments.push({ input, before, after });
          });

          for (const { input, before, after } of sentenceFragments) {
            const regex = new RegExp(
              `${escapeReg(before)}\\s+(\\S+?)\\s+${escapeReg(after)}`, 'i'
            );
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
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }
})();