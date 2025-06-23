import { HintGenerator } from "./generate_hint_name";

interface Hint {
    referredElement: HTMLElement;
    hintElement: HTMLElement;
}

export class Hints {
    private hints: Hint[] = [];
    private hintAssigner = new HintGenerator();

    showHints() {
        const shadowDiv = document.createElement('div');
        shadowDiv.id = 'hints-vimium-d';
        shadowDiv.attachShadow({ mode: 'open' });
        shadowDiv.style.position = 'fixed';
        shadowDiv.style.top = '0';
        shadowDiv.style.left = '0';
        shadowDiv.style.width = '100%';
        shadowDiv.style.height = '100%';
        shadowDiv.style.zIndex = '2147483647';
        shadowDiv.style.pointerEvents = 'none';
        document.body.appendChild(shadowDiv);
        console.log(shadowDiv);

        const allClickableElements = document.querySelectorAll('a, button, input, textarea, select, option, optgroup');
        console.log(allClickableElements);
        allClickableElements.forEach(element => {
            if (!this.isElementVisible(element as HTMLElement)) {
                return;
            }
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
                innerSpan.textContent = this.hintAssigner.assignHint(element);
            }
            innerSpan.style.position = 'absolute';
            innerSpan.style.top = `${rect.top}px`;
            innerSpan.style.left = `${rect.left}px`;
            innerSpan.style.backgroundColor = 'red';
            innerSpan.style.opacity = '1';
            shadowDiv.shadowRoot?.appendChild(innerSpan);
            
            this.hints.push({ referredElement: element as HTMLElement, hintElement: container });
        });
    }

    hideHints() {
        const shadowDiv = document.getElementById('hints-vimium-d');
        console.log(shadowDiv);
        if (shadowDiv) {
            shadowDiv.remove();
        }
        this.hints = [];
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
