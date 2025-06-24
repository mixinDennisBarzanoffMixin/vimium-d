interface HintEntry {
    hint: string;
    element: HTMLElement;
}

export class HintGenerator {
    private takenHints: Set<string>;
    private hintMap: Map<number, HintEntry[]>;
    private validShortcuts: string[];
    constructor() {
        // Generate letters from a-z
        this.takenHints = new Set();
        this.hintMap = new Map();
        this.validShortcuts = this.generateValidShortcutMap();
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

    private generateValidShortcutMap(): string[] {
        const availableLettersLeftHand = "qwertasdfgzxcvb".split('');
        const availableLettersRightHand = "mnlkjhpoiuy".split('');
        const validShortcuts: string[] = [];
        // Left hand + Right hand combinations
        for (let i = 0; i < availableLettersLeftHand.length; i++) {
            for (let j = 0; j < availableLettersRightHand.length; j++) {
                validShortcuts.push(availableLettersLeftHand[i] + availableLettersRightHand[j]);
            }
        }

        // Right hand + Left hand combinations 
        for (let i = 0; i < availableLettersRightHand.length; i++) {
            for (let j = 0; j < availableLettersLeftHand.length; j++) {
                validShortcuts.push(availableLettersRightHand[i] + availableLettersLeftHand[j]);
            }
        }
        return validShortcuts;
    }

    private generateNextAvailableHint(hash: number): string {
        // Calculate starting position based on hash
        const totalCombinations = this.validShortcuts.length;
        const startingPosition = hash % totalCombinations;
        
        // Try all possible combinations starting from hash position
        for (let i = 0; i < totalCombinations; i++) {
            const position = (startingPosition + i) % totalCombinations;
            const hint = this.validShortcuts[position];
            
            if (!this.takenHints.has(hint)) {
                return hint;
            }
        }
        
        throw new Error('Ran out of possible hints!');
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