export class Scroll {
    // Konfigurations-Konstanten
    private static readonly MIN_DURATION = 100;
    private static readonly MAX_DURATION = 800;
    private static readonly DURATION_SCALE = 100;

    isEnabled = false;
    direction = 0;
    
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