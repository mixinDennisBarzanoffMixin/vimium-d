import { HintEntry, HintGenerator } from "./generate_hint_name";

export interface Hint {
    referredElement: HTMLElement;
    hintElement: HTMLElement;

    show(): void;
}

export class HintDisplayer {
    private hintAssigner: HintGenerator;

    constructor(hintAssigner: HintGenerator) {
        this.hintAssigner = hintAssigner;
    }

    createShadowRootIfNotExists() {
        let shadowDiv = document.getElementById('hints-vimium-d');
        if (shadowDiv) {
            return;
        }
        shadowDiv = document.createElement('div');
        shadowDiv.id = 'hints-vimium-d';
        shadowDiv.style.position = 'fixed';
        shadowDiv.style.top = '0';
        shadowDiv.style.left = '0';
        shadowDiv.style.width = '100%';
        shadowDiv.style.height = '100%';
        shadowDiv.style.zIndex = '2147483647';
        shadowDiv.style.pointerEvents = 'none';
        document.body.appendChild(shadowDiv);
        shadowDiv.attachShadow({ mode: 'open' });
    }

    showSingleHint(hint: HintEntry) {
        this.createShadowRootIfNotExists();
        const element = hint.element;
        const shadowDiv = document.getElementById('hints-vimium-d')!;
        const rect = element.getBoundingClientRect();
        
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = `${rect.top}px`;
        container.style.left = `${rect.left}px`;
        container.style.width = `${rect.width}px`;
        container.style.height = `${rect.height}px`;
        container.style.backgroundColor = 'yellow';
        container.style.opacity = '0.4';
        container.style.pointerEvents = 'none';
        
        shadowDiv.shadowRoot?.appendChild(container);

        const innerSpan = document.createElement('span');
        if (element instanceof HTMLElement) {
            innerSpan.textContent = hint.hint;
        }
        innerSpan.style.position = 'absolute';
        innerSpan.style.top = `${rect.top}px`;
        innerSpan.style.left = `${rect.left}px`;
        innerSpan.style.backgroundColor = 'red';
        innerSpan.style.opacity = '1';
        shadowDiv.shadowRoot?.appendChild(innerSpan);
    }

    showHints() {
        this.createShadowRootIfNotExists();

        const allClickableElements = document.querySelectorAll('a, button, input, textarea, select, option, optgroup');
        console.log(allClickableElements);
        allClickableElements.forEach(element => {
            if (!this.isElementVisible(element as HTMLElement)) {
                return;
            }
            const hint = this.hintAssigner.retrieveHint(element as HTMLElement);
            this.showSingleHint({
                element: element as HTMLElement,
                hint: hint
            });
        });
    }

    hideHints() {
        const shadowDiv = document.getElementById('hints-vimium-d');
        console.log(shadowDiv);
        if (shadowDiv) {
            shadowDiv.remove();
        }
        this.hintAssigner.clearHints();
    }

    private isElementVisible(element: HTMLElement): boolean {
        let current: HTMLElement | null = element;
        
        const rect = element.getBoundingClientRect();
        if (rect.top < 0 || 
            rect.left < 0 || 
            rect.bottom > window.innerHeight ||
            rect.right > window.innerWidth) {
            return false;
        }
        
        // Zweite Überprüfung: Ist das Element oder seine Eltern versteckt? (Second check: Is the element or its parents hidden?)
        while (current) {
            const style = window.getComputedStyle(current);
            
            if (style.display === 'none' || 
                style.visibility === 'hidden' || 
                style.opacity === '0') {
                return false;
            }
            
            current = current.parentElement;
        }
        
        return true;
    }
}
