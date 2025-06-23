interface HintEntry {
    hint: string;
    element: HTMLElement;
}

export class HintGenerator {
    private availableLetters: string[];
    private takenHints: Set<string>;
    private hintMap: Map<number, HintEntry[]>;
    
    constructor() {
        // Generate letters from a-z
        this.availableLetters = "abcdeghilmnopqrstuvwxyz".split('');
        this.takenHints = new Set();
        this.hintMap = new Map();
    }

    private hashElement(element: HTMLElement): number {
        // Hash based on position and tag name for uniqueness
        let str = `${element.tagName}`;
        for (const attr of element.attributes) {
            str += `-${attr.name}=${attr.value}`;
        }
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash);
    }

    private generateNextAvailableHint(hash: number): string {
        let hint = '';
        let letterIndex = 0;
        
        // If all single letters are taken, start combining letters
        letterIndex = 0;
        while (true) {
            for (let secondIndex = 0; secondIndex < this.availableLetters.length; secondIndex++) {
                hint = this.availableLetters[letterIndex] + this.availableLetters[secondIndex];
                if (!this.takenHints.has(hint)) {
                    return hint;
                }
            }
            letterIndex++;
            // In theory we could go forever, but in practice this should be enough
            if (letterIndex >= this.availableLetters.length) {
                throw new Error('Ran out of possible hints!');
            }
        }
    }

    assignHint(element: HTMLElement): string {
        const hash = this.hashElement(element);
        const hint = this.generateNextAvailableHint(hash);
        
        // Store the hint
        const entries = this.hintMap.get(hash) || [];
        entries.push({ hint, element });
        this.hintMap.set(hash, entries);
        this.takenHints.add(hint);
        
        return hint.toUpperCase();
    }

    getElementByHint(hint: string): HTMLElement | null {
        // Search through all entries
        for (const entries of this.hintMap.values()) {
            const entry = entries.find(e => e.hint === hint);
            if (entry) {
                return entry.element;
            }
        }
        return null;
    }

    clearHints(): void {
        this.takenHints.clear();
        this.hintMap.clear();
    }
}