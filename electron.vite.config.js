import { defineConfig } from "electron-vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
    publicDir: false,
    main: {},
    preload: {},
    renderer: {
        plugins: [react()]
    }
});

// Implements fast-refresh for React components
// https://www.npmjs.com/package/react-refresh