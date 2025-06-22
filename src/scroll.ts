export class Scroll {
    private isEnabled = false;
    private direction = 0;
    
    /**
     * Smooth scroll to the direction
     * @param direction - The direction to scroll to
     * 
     * The way this works is by continuously scrolling in small increments
     * using requestAnimationFrame for smooth animation. When enabled,
     * it will keep scrolling in the specified direction until disabled.
     * 
     * This is so that the scroll doesn't get interrupted by calling the function again.
     * If the user releases the key, they should call smoothScrollDisable() to stop the scroll.
     * 
     */
    smoothScrollEnable(direction: number) {
        this.direction = direction;
        if (this.isEnabled) {
            return;
        }
        
        this.isEnabled = true;
        const animate = (currentTime: number) => {
            const currentScroll = window.scrollY;
            const targetScroll = currentScroll + this.direction;
            
            if (!this.isEnabled) {
                return;
            }
            
            window.scrollTo({
                top: targetScroll,
                behavior: 'instant'
            });
            
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    }

    smoothScrollDisable() {
        this.isEnabled = false;
    }
}