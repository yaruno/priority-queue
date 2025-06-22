import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: false,
    clean: true,
    treeshake: true,
    minify: false,
    outDir: 'dist',
    target: ['node18', 'es2017'],
    globalName: 'PriorityQueue',
    esbuildOptions(options) {
        options.banner = {
            js: '// Priority Queue - A TypeScript implementation\n',
        }
    },
}) 