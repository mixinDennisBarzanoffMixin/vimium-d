// keypressing logic and buffering

import { HintEntry, IGetElementByHint } from "./generate_hint_name";


export class KeyPress {
    private keypresses: string[] = [];
    private keyPressed: IGetElementByHint

    constructor(keyPressed: IGetElementByHint) {
        this.keyPressed = keyPressed;
    }
    
    detectElementsPressed(key: string): HintEntry[] {
        this.keypresses.push(key);
        // that's how big we want the buffer to be
        if (this.keypresses.length > 2) {
            this.keypresses.shift();
        }
        // last two letters pressed
        console.log('last two letters pressed', this.keypresses.join(''))
        const selectedElements = this.keyPressed.getElementsByHint(this.keypresses.join(''))
        console.log('selectedElements', selectedElements)
        return selectedElements;
    }
}