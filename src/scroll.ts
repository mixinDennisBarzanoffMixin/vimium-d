export class Scroll {
    smoothScrollBy(top: number) {
        // animation
        // for this animation we need to go from current scroll to target scroll in easy out
        const currentScroll = window.scrollY;
        const start = performance.now();
        console.log(start);
        const duration = 100;
        function animate(currentTime: number) {
            const elapsed = currentTime - start;
            console.log(elapsed);
            const progress = Math.min(elapsed / duration, 1);
            console.log(progress);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            console.log(easeOutCubic);
            console.log('----------------------------')
            window.scrollTo({
                top: currentScroll + top * easeOutCubic,
                behavior: 'smooth'
            });
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
    }
}