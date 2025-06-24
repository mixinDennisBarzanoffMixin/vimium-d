// keypressing logic and buffering

import { IGetElementByHint } from "./hints";


export class KeyPress {
    private keypresses: string[] = [];
    private keyPressed: IGetElementByHint

    constructor(keyPressed: IGetElementByHint) {
        this.keyPressed = keyPressed;
    }
    
    detectElementPressed(key: string): HTMLElement | null {
        this.keypresses.push(key);
        // that's how big we want the buffer to be
        if (this.keypresses.length > 2) {
            this.keypresses.shift();
        }
        // last two letters pressed
        console.log('last two letters pressed', this.keypresses.join(''))
        const selectedElement = this.keyPressed.getElementByHint(this.keypresses.join(''))
        return selectedElement;
    }
}