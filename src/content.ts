// Vimium-D Content Script (TypeScript)
// Hier implementieren Sie die Tastaturnavigation

import { Scroll } from "./scroll";

console.log('Vimium-D Content Script geladen');

// const state: ExtensionState = {
//   isActive: false,
//   currentHints: [],
//   currentHintInput: ''
// };


document.addEventListener('keydown', function(event: KeyboardEvent): void {
  handleKeyPress(event.key);
});

function handleKeyPress(key: string): void {
    const scroll = new Scroll();
    console.log('Taste gedrückt:', key);
    if (key === 'j') {
        scroll.smoothScrollBy(30); // Kleinere Schritte für sanfteres Scrollen
    } else if (key === 'k') {
        scroll.smoothScrollBy(-30);
    } 
}
