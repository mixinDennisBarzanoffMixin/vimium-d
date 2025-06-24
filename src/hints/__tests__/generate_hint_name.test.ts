import { describe, it, expect, beforeEach } from 'vitest';
import { HintGenerator } from '../generate_hint_name';

describe('HintGenerator', () => {
    let hintGenerator: HintGenerator;

    beforeEach(() => {
        hintGenerator = new HintGenerator();
    });

    it('should generate uppercase hints', () => {
        const element = document.createElement('a');
        element.href = 'https://example.com';
        document.body.appendChild(element);

        const hint = hintGenerator.assignHint(element);
        expect(hint).toBe('AA');
    });
}); 