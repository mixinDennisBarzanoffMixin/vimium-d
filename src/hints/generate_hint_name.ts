export interface HintEntry {
    hint: string;
    element: HTMLElement;
}

export interface IGetElementByHint {
    getElementsByHint(key: string): HintEntry[]
}

export class HintGenerator implements IGetElementByHint {
    private hintMap: Map<string, HintEntry[]>;
    private validShortcuts: string[];
    constructor() {
        // Generate letters from a-z
        this.hintMap = new Map();
        this.validShortcuts = this.generateValidShortcutMap();
    }

    private hashElement(element: HTMLElement): number {
        // Hash based on position and tag name for uniqueness
        let str = `${element.tagName}`;
        const attributesToConsider = Array.from(element.attributes)
            .filter(attr => {
                return attr.name.includes('aria-') || attr.name.includes('data-') || attr.name.includes('role');
            });
        for (const attr of attributesToConsider) {
            // if (attr.name.includes('data-')) {
            //     // don't include the data- attribute if aria label exists
            //     if (attributesToConsider.some(attr => attr.name.includes('aria-'))) {
            //         console.log('for element', element, 'skipping data- attribute because aria tag exists', attr.name, attr.value)
            //         continue;
            //     }
            // }
            str += `-${attr.name}=${attr.value}`;
        }
        str += `-${element.id}`;
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
        
        const position = startingPosition % totalCombinations;
        const hint = this.validShortcuts[position];
        
        return hint;
    }

    retrieveHint(element: HTMLElement): string {
        const hash = this.hashElement(element);
        const hint = this.generateNextAvailableHint(hash);
        
        // Store the hint
        const entries = this.hintMap.get(hint) || [];
        if (entries.length > 0) {
            console.log('collision detected', hint, entries[0].hint)
        }
        entries.push({ hint, element });
        console.log('setting hint', hint, entries)
        this.hintMap.set(hint, entries);
        
        return hint.toUpperCase();
    }

    getElementsByHint(hint: string): HintEntry[] {
        // Search through all entries
        const entries = this.hintMap.get(hint) || [];
        console.log('entries for hint', hint, entries)
        return entries;
    }

    clearHints(): void {
        this.hintMap.clear();
    }
}