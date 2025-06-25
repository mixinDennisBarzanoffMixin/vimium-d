// Vimium-D Content Script (TypeScript)
// Hier implementieren Sie die Tastaturnavigation

import { HintGenerator } from "./hints/generate_hint_name";
import { HintDisplayer } from "./hints/hints";
import { KeyPress } from "./hints/keypress";
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
const hintGenerator = new HintGenerator();
const hintManager = new HintDisplayer(hintGenerator);
const keyPress = new KeyPress(hintGenerator);

function handleKeyPress(key: string): void {
    const clickedElements = keyPress.detectElementsPressed(key);
    if (clickedElements.length > 1) {
        hintManager.hideHints();
        clickedElements.forEach(hint => {
            hintManager.showSingleHint(hint);
        });
    } else if (clickedElements.length === 1) {
        const element = clickedElements[0].element;
        if (element instanceof HTMLElement) {
            hintManager.hideHints();
            element.click();
        }
    }
    if (key === 'j') {
        scroll.smoothScrollEnable(30);
    } else if (key === 'k') {
        scroll.smoothScrollEnable(-30);
    } else if (key === 'Escape') {
        console.log('hide hints');
        hintManager.hideHints();
        console.log(document.activeElement);
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }
}



// const observability = new Observability(() => {
//     hints.hideHints();
// });

let isTyping = false;

function initialIsFocused() {
    const focused = document.activeElement;
    if (focused instanceof HTMLInputElement || focused instanceof HTMLTextAreaElement) {
        return true;
    }
    return false;
}

if (initialIsFocused()) {
    isTyping = true;
}


document.addEventListener('keypress', function(event: KeyboardEvent): void {
    if (isTyping) return;
    
    if (event.key === 'f') {
        console.log('show hints');
        hintManager.showHints();
    } 
});

// we track focus in and out on every form element
// cuz we don't wanna trigger shortcuts when we are typing
const focusInEventHandler = ((event: Event) => {
    isTyping = true;
}) as EventListener;

const focusOutEventHandler = ((event: Event) => {
    isTyping = false;
}) as EventListener;

function attachFormListeners() {
    const formElements = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
    console.log('formElements attaching');
    formElements.forEach(element => {
        element.addEventListener('focusin', focusInEventHandler);
        element.addEventListener('focusout', focusOutEventHandler);
    });
}

function removeFormListeners() {
    const formElements = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
    console.log('formElements removing');
    formElements.forEach(element => {
        element.removeEventListener('focusin', focusInEventHandler); 
        element.removeEventListener('focusout', focusOutEventHandler); 
    });
}

// Initial attachment
attachFormListeners();

// Watch for new form elements being added
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            removeFormListeners();
            attachFormListeners();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});