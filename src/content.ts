// Vimium-D Content Script (TypeScript)
// Hier implementieren Sie die Tastaturnavigation

console.log('Vimium-D Content Script geladen');

// const state: ExtensionState = {
//   isActive: false,
//   currentHints: [],
//   currentHintInput: ''
// };

class Scroll {
    smoothScrollBy(top: number, duration: number = 300) {
        const currentScroll = window.scrollY;
        const targetScroll = currentScroll + top;
        const startTime = performance.now();
        
        function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing-Funktion für sanftere Bewegung
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            
            const currentPosition = currentScroll + (targetScroll - currentScroll) * easeOutCubic;
            window.scrollTo(0, currentPosition);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
}

document.addEventListener('keydown', function(event: KeyboardEvent): void {
  handleKeyPress(event.key);
});

function handleKeyPress(key: string): void {
    const scroll = new Scroll();
    console.log('Taste gedrückt:', key);
    if (key === 'j') {
        scroll.smoothScrollBy(30); // Kleinere Schritte für sanfteres Scrollen
    } else if (key === 'k') {
        scroll.smoothScrollBy(-30);
    } 
}
