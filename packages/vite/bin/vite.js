#!/usr/bin/env node
import http from 'node:http';
import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { extname, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = process.cwd();
const globalTypeScript = '/root/.nvm/versions/node/v24.15.0/lib/node_modules/typescript/lib/typescript.js';
const ts = await import(pathToFileURL(globalTypeScript));
const command = process.argv[2] ?? 'dev';

function transformImports(code) {
  return code
    .replace(/import\s+['"](.*?\.css)['"];?/g, '')
    .replace(/from ['"]react['"]/g, "from '/node_modules/react/index.js'")
    .replace(/from ['"]react\/jsx-runtime['"]/g, "from '/node_modules/react/jsx-runtime.js'")
    .replace(/from ['"]react-dom\/client['"]/g, "from '/node_modules/react-dom/client.js'")
    .replace(/(from\s+['"])(\.{1,2}\/[^'"]+)(['"])/g, (_match, start, specifier, end) => {
      if (/\.(js|css|json)$/.test(specifier)) return `${start}${specifier}${end}`;
      return `${start}${specifier}.js${end}`;
    });
}

function transpile(filePath) {
  const source = readFileSync(filePath, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
    },
    fileName: filePath,
  }).outputText;
  return transformImports(output);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function build() {
  const dist = join(root, 'dist');
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(join(dist, 'src'), { recursive: true });
  walk(join(root, 'src')).forEach((file) => {
    const relativePath = relative(join(root, 'src'), file);
    const outPath = join(dist, 'src', relativePath).replace(/\.tsx?$/, '.js');
    mkdirSync(dirname(outPath), { recursive: true });
    if (/\.d\.ts$/.test(file)) {
      return;
    }
    if (/\.tsx?$/.test(file)) {
      writeFileSync(outPath, transpile(file));
    } else {
      copyFileSync(file, join(dist, 'src', relativePath));
    }
  });
  if (existsSync(join(root, 'public'))) cpSync(join(root, 'public'), dist, { recursive: true });
  mkdirSync(join(dist, 'node_modules/react'), { recursive: true });
  mkdirSync(join(dist, 'node_modules/react-dom'), { recursive: true });
  copyFileSync(join(root, 'node_modules/react/index.js'), join(dist, 'node_modules/react/index.js'));
  copyFileSync(join(root, 'node_modules/react/jsx-runtime.js'), join(dist, 'node_modules/react/jsx-runtime.js'));
  copyFileSync(join(root, 'node_modules/react-dom/client.js'), join(dist, 'node_modules/react-dom/client.js'));
  writeFileSync(join(dist, 'index.html'), readFileSync(join(root, 'index.html'), 'utf8').replace('</head>', '  <link rel="stylesheet" href="/src/styles/global.css" />\n  </head>').replace('/src/main.tsx', '/src/main.js'));
  console.log('vite v7.0.0-local building for production...');
  console.log('✓ built in dist');
}

function contentType(filePath) {
  const ext = extname(filePath);
  return ext === '.html' ? 'text/html' : ext === '.js' ? 'text/javascript' : ext === '.css' ? 'text/css' : ext === '.json' || ext === '.webmanifest' ? 'application/json' : 'application/octet-stream';
}

function serve(baseDir, port) {
  const server = http.createServer((request, response) => {
    const url = new URL(request.url ?? '/', `http://${request.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';
    if (pathname.startsWith('/src/') && /\.tsx?$/.test(pathname)) pathname = pathname.replace(/\.tsx?$/, '.js');
    let filePath = join(baseDir, pathname);
    if (!existsSync(filePath) && pathname.startsWith('/src/') && pathname.endsWith('.js')) {
      const tsxPath = join(baseDir, pathname.replace(/\.js$/, '.tsx'));
      const tsPath = join(baseDir, pathname.replace(/\.js$/, '.ts'));
      if (existsSync(tsxPath) || existsSync(tsPath)) {
        response.writeHead(200, { 'content-type': 'text/javascript' });
        response.end(transpile(existsSync(tsxPath) ? tsxPath : tsPath));
        return;
      }
    }
    if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }
    if (filePath.endsWith('index.html') && baseDir === root) {
      response.writeHead(200, { 'content-type': 'text/html' });
      response.end(readFileSync(filePath, 'utf8').replace('</head>', '  <link rel="stylesheet" href="/src/styles/global.css" />\n  </head>').replace('/src/main.tsx', '/src/main.js'));
      return;
    }
    response.writeHead(200, { 'content-type': contentType(filePath) });
    response.end(readFileSync(filePath));
  });
  server.listen(port, '0.0.0.0', () => console.log(`  ➜  Local: http://localhost:${port}/`));
}

if (command === 'build') {
  build();
} else if (command === 'preview') {
  serve(resolve(root, 'dist'), 4173);
} else {
  serve(root, 5173);
}
