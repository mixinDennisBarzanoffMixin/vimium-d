import { beforeEach } from 'vitest';
import '@testing-library/dom';

// Global setup code can go here
beforeEach(() => {
    // Reset the DOM before each test
    document.body.innerHTML = '';
}); 