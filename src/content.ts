// Vimium-D Content Script (TypeScript)
// Hier implementieren Sie die Tastaturnavigation

import { Hints } from "./hints/hints";
import { Observability } from "./hints/observability";
import { Scroll } from "./scroll";

console.log('Vimium-D Content Script geladen');

// const state: ExtensionState = {
//   isActive: false,
//   currentHints: [],
//   currentHintInput: ''
// };

let scroll: Scroll = new Scroll();

document.addEventListener('keydown', function(event: KeyboardEvent): void {
  handleKeyPress(event.key);
});

document.addEventListener('keyup', function(event: KeyboardEvent): void {
    handleKeyUp(event.key);
});


function handleKeyUp(key: string): void {
    scroll.smoothScrollDisable();
}
const hints = new Hints();

function handleKeyPress(key: string): void {
    console.log('Taste gedrückt:', key);
    if (key === 'j') {
        scroll.smoothScrollEnable(30);
    } else if (key === 'k') {
        scroll.smoothScrollEnable(-30);
    } else if (key === 'Escape') {
        console.log('hide hints');
        hints.hideHints();
    }
}



// const observability = new Observability(() => {
//     hints.updateHints();
// });

let isTyping = false;

document.addEventListener('focusin', (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        isTyping = true;
    }
});

document.addEventListener('focusout', (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        isTyping = false;
    }
});

document.addEventListener('keypress', function(event: KeyboardEvent): void {
    if (isTyping) return;
    
    if (event.key === 'f') {
        console.log('show hints');
        hints.showHints();
    } 
});