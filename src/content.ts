// Vimium-D Content Script (TypeScript)
// Hier implementieren Sie die Tastaturnavigation

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

function handleKeyPress(key: string): void {
    console.log('Taste gedrückt:', key);
    if (key === 'j') {
        scroll.smoothScrollEnable(30);
    } else if (key === 'k') {
        scroll.smoothScrollEnable(-30);
    } 
}
