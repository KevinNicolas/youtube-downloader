const esbuild = require('esbuild');

const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild
  .build({
    entryPoints: ['./src/main.ts'],
    outfile: 'dist/bundle.js',
    bundle: true,
    minify: true,
    platform: 'node',
    sourcemap: true,
    target: 'node14',
    tsconfig: './tsconfig.json',
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
