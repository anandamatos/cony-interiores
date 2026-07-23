import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const DIST_ASSETS_DIR = path.resolve(process.cwd(), 'dist', 'assets');

const KB = 1024;
const BUDGETS = {
  mainEntryGzipKb: 90,
  chartsChunkGzipKb: 120,
  totalJsGzipKb: 260,
  totalCssGzipKb: 30,
};

function gzipSizeKb(buffer) {
  return zlib.gzipSync(buffer).length / KB;
}

function readAssets() {
  if (!fs.existsSync(DIST_ASSETS_DIR)) {
    throw new Error('Diretorio dist/assets nao encontrado. Rode "npm run build" antes de validar performance.');
  }

  const files = fs.readdirSync(DIST_ASSETS_DIR);
  return files.map((fileName) => {
    const filePath = path.join(DIST_ASSETS_DIR, fileName);
    const content = fs.readFileSync(filePath);
    const ext = path.extname(fileName);
    return {
      fileName,
      ext,
      sizeKb: content.length / KB,
      gzipKb: gzipSizeKb(content),
    };
  });
}

function findMainEntryJs(assets) {
  const candidates = assets
    .filter((asset) => asset.ext === '.js' && asset.fileName.startsWith('index-'))
    .sort((a, b) => b.gzipKb - a.gzipKb);

  return candidates[0] ?? null;
}

function sumByExt(assets, ext) {
  return assets.filter((asset) => asset.ext === ext).reduce((acc, cur) => acc + cur.gzipKb, 0);
}

function formatKb(value) {
  return `${value.toFixed(2)} KB`;
}

function checkThreshold(name, value, max) {
  const ok = value <= max;
  return {
    name,
    value,
    max,
    ok,
  };
}

function main() {
  const assets = readAssets();

  const mainEntry = findMainEntryJs(assets);
  const chartsChunk = assets.find((asset) => asset.fileName.startsWith('charts-vendor-') && asset.ext === '.js');
  const totalJsGzipKb = sumByExt(assets, '.js');
  const totalCssGzipKb = sumByExt(assets, '.css');

  const checks = [
    checkThreshold(
      'Main entry JS (gzip)',
      mainEntry ? mainEntry.gzipKb : Number.POSITIVE_INFINITY,
      BUDGETS.mainEntryGzipKb
    ),
    checkThreshold(
      'Charts chunk JS (gzip)',
      chartsChunk ? chartsChunk.gzipKb : 0,
      BUDGETS.chartsChunkGzipKb
    ),
    checkThreshold('Total JS (gzip)', totalJsGzipKb, BUDGETS.totalJsGzipKb),
    checkThreshold('Total CSS (gzip)', totalCssGzipKb, BUDGETS.totalCssGzipKb),
  ];

  console.log('\nPerformance budget report\n');

  checks.forEach((check) => {
    const status = check.ok ? 'PASS' : 'FAIL';
    console.log(`${status} - ${check.name}: ${formatKb(check.value)} (limite: ${formatKb(check.max)})`);
  });

  if (mainEntry) {
    console.log(`\nMain entry detectado: ${mainEntry.fileName}`);
  }

  const failed = checks.filter((check) => !check.ok);
  if (failed.length > 0) {
    process.exitCode = 1;
    return;
  }

  console.log('\nTodos os budgets de performance foram atendidos.');
}

main();
