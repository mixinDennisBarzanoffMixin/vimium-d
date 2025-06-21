export class Scroll {
    smoothScrollBy(top: number) {
        // animation
        // for this animation we need to go from current scroll to target scroll in easy out
        const currentScroll = window.scrollY;
        const start = performance.now();
        console.log(start);
        window.scrollTo({
            top: currentScroll + top,
            behavior: 'smooth'
        });
    }
}