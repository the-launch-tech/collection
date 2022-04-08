import { defineConfig, UserConfigExport } from 'vite';
import solid from 'vite-plugin-solid';

const config = {
    plugins: [solid()],
    build: {
        assetsInlineLimit: 0,
        target: 'esnext',
        polyfillDynamicImport: false,
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
} as UserConfigExport;

export default defineConfig(config);
