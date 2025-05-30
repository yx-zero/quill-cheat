// ==UserScript==
// @name         Quill Auto Answer
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  autofill answers in quill
// @match        https://www.quill.org/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  
  console.log('[Quill Auto] Script initialized');
  
  const origFetch = window.fetch;
  
  window.fetch = async function (...args) {
    let response;
    
    try {
      console.log('[Quill Auto] Fetch intercepted:', args[0]);
      response = await origFetch(...args);
      console.log('[Quill Auto] Fetch response status:', response.status);
    } catch (fetchError) {
      console.error('[Quill Auto] Fetch failed:', fetchError);
      throw fetchError;
    }
    
    try {
      const url = args[0];
      
      if (typeof url !== 'string') {
        console.log('[Quill Auto] URL is not a string:', typeof url, url);
        return response;
      }
      
      if (!url.includes('/responses')) {
        console.log('[Quill Auto] URL does not contain /responses:', url);
        return response;
      }
      
      console.log('[Quill Auto] Processing responses URL:', url);
      
      const clone = response.clone();
      let json;
      
      try {
        json = await clone.json();
        console.log('[Quill Auto] Response JSON parsed successfully:', json);
      } catch (parseError) {
        console.error('[Quill Auto] Failed to parse JSON response:', parseError);
        return response;
      }
      
      if (!Array.isArray(json)) {
        console.warn('[Quill Auto] Response is not an array:', typeof json, json);
        return response;
      }
      
      if (json.length === 0) {
        console.warn('[Quill Auto] Response array is empty');
        return response;
      }
      
      if (!json[0] || typeof json[0] !== 'object') {
        console.warn('[Quill Auto] First array element is invalid:', json[0]);
        return response;
      }
      
      if (!json[0].text || typeof json[0].text !== 'string') {
        console.warn('[Quill Auto] No valid text property found:', json[0].text);
        return response;
      }
      
      const fullAnswer = json[0].text;
      console.log('[Quill Auto] Full answer text extracted:', fullAnswer);
      
      // Try to fill single text area
      try {
        const singleInput = document.querySelector('textarea.connect-text-area');
        console.log('[Quill Auto] Single input element found:', !!singleInput);
        
        if (singleInput) {
          forceSetInputValue(singleInput, fullAnswer);
          console.log('[Quill Auto] Successfully filled single textarea');
        }
      } catch (singleInputError) {
        console.error('[Quill Auto] Error filling single input:', singleInputError);
      }
      

      try {
        const inputs = document.querySelectorAll('input.fill-in-blank-input');
        console.log('[Quill Auto] Fill-in-blank inputs found:', inputs.length);
        
        if (inputs.length > 0) {
          let sentenceFragments = [];
          
          inputs.forEach((input, index) => {
            try {
              const before = input.previousSibling?.textContent?.trim() || '';
              const after = input.nextSibling?.textContent?.trim() || '';
              
              console.log(`[Quill Auto] Input ${index + 1} context - Before: "${before}", After: "${after}"`);
              
              sentenceFragments.push({ input, before, after, index });
            } catch (fragmentError) {
              console.error(`[Quill Auto] Error processing input ${index + 1}:`, fragmentError);
            }
          });
          
          console.log('[Quill Auto] Processing', sentenceFragments.length, 'sentence fragments');
          
          for (const { input, before, after, index } of sentenceFragments) {
            try {
              console.log(`[Quill Auto] Processing fragment ${index + 1}`);
              
              if (!before && !after) {
                console.warn(`[Quill Auto] No context found for input ${index + 1}`);
                continue;
              }
              
              const escapedBefore = escapeReg(before);
              const escapedAfter = escapeReg(after);
              const regexPattern = `${escapedBefore}\\s+(\\S+?)\\s+${escapedAfter}`;
              
              console.log(`[Quill Auto] Regex pattern for input ${index + 1}:`, regexPattern);
              
              const regex = new RegExp(regexPattern, 'i');
              const match = fullAnswer.match(regex);
              
              if (match && match[1]) {
                console.log(`[Quill Auto] Match found for input ${index + 1}:`, match[1]);
                forceSetInputValue(input, match[1]);
                console.log(`[Quill Auto] Successfully filled blank ${index + 1}: "${match[1]}"`);
              } else {
                console.warn(`[Quill Auto] No match found for input ${index + 1} between "${before}" and "${after}"`);
                console.log(`[Quill Auto] Full answer for reference:`, fullAnswer);
              }
            } catch (blankError) {
              console.error(`[Quill Auto] Error processing blank ${index + 1}:`, blankError);
            }
          }
        }
      } catch (blanksError) {
        console.error('[Quill Auto] Error processing fill-in-blanks:', blanksError);
      }
      
    } catch (mainError) {
      console.error('[Quill Auto] Main processing error:', mainError);
      console.error('[Quill Auto] Error stack:', mainError.stack);
    }
    
    return response;
  };
  
  function escapeReg(str) {
    try {
      if (typeof str !== 'string') {
        console.warn('[Quill Auto] escapeReg received non-string:', typeof str, str);
        return '';
      }
      const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      console.log('[Quill Auto] Escaped regex:', str, '->', escaped);
      return escaped;
    } catch (escapeError) {
      console.error('[Quill Auto] Error in escapeReg:', escapeError);
      return '';
    }
  }
  
  function forceSetInputValue(input, value) {
    try {
      console.log('[Quill Auto] Setting input value:', value, 'on element:', input);
      
      if (!input) {
        console.error('[Quill Auto] Input element is null/undefined');
        return;
      }
      
      if (typeof value !== 'string') {
        console.warn('[Quill Auto] Value is not a string:', typeof value, value);
        value = String(value);
      }
      
      if (input instanceof HTMLInputElement) {
        console.log('[Quill Auto] Setting HTMLInputElement value');
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        
        if (!nativeInputValueSetter) {
          console.error('[Quill Auto] Could not get native input value setter');
          input.value = value; // Fallback
        } else {
          nativeInputValueSetter.call(input, value);
        }
      } else if (input instanceof HTMLTextAreaElement) {
        console.log('[Quill Auto] Setting HTMLTextAreaElement value');
        const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
        
        if (!nativeTextAreaValueSetter) {
          console.error('[Quill Auto] Could not get native textarea value setter');
          input.value = value; // Fallback
        } else {
          nativeTextAreaValueSetter.call(input, value);
        }
      } else {
        console.error('[Quill Auto] Unsupported input type:', input.constructor.name, input);
        return;
      }
      
      // Dispatch
      try {
        console.log('[Quill Auto] Dispatching input events');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('[Quill Auto] Events dispatched successfully');
      } catch (eventError) {
        console.error('[Quill Auto] Error dispatching events:', eventError);
      }
      
      console.log('[Quill Auto] Input value set successfully');
      
    } catch (setValueError) {
      console.error('[Quill Auto] Error in forceSetInputValue:', setValueError);
      console.error('[Quill Auto] Error stack:', setValueError.stack);
    }
  }
  
  console.log('[Quill Auto] Script setup complete');
})();
