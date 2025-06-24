/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        environment: 'happy-dom',
        include: ['src/**/*.{test,spec}.{js,ts}'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'dist/',
            ],
        },
        setupFiles: ['./src/test/setup.ts'],
    },
}); 