export class Observability {
    private onPageChange: () => void;

    constructor(onPageChange: () => void) {
        this.onPageChange = onPageChange;
        this.observeMutations();
        this.observeResize();
        this.observeScroll();
    }

    observeScroll() {
        window.addEventListener('scroll', () => {
            this.onPageChange();
        });
    }

    observeMutations() {
        const observer = new MutationObserver((mutations) => {
            this.onPageChange();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    observeResize() {
        const resizeObserver = new ResizeObserver((entries) => {
            this.onPageChange();
        });

        resizeObserver.observe(document.body);
    }
}