import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT_DIR = process.cwd();
const DIST_ASSETS_DIR = path.resolve(ROOT_DIR, 'dist', 'assets');
const BUILD_DIR = path.resolve(ROOT_DIR, 'build');
const LIGHTHOUSE_SUMMARY_PATH = path.resolve(BUILD_DIR, 'lighthouse-summary.json');
const KPI_REPORT_JSON_PATH = path.resolve(BUILD_DIR, 'performance-kpi-report.json');
const KPI_REPORT_MD_PATH = path.resolve(BUILD_DIR, 'performance-kpi-report.md');

const KB = 1024;

const TARGETS = {
  initialLoadMs: Number(process.env.KPI_TARGET_INITIAL_LOAD_MS || 2500),
  interactionMs: Number(process.env.KPI_TARGET_INTERACTION_MS || 1500),
  bundleSizeKb: Number(process.env.KPI_TARGET_BUNDLE_SIZE_KB || 260),
  performanceScore: Number(process.env.KPI_TARGET_PERFORMANCE_SCORE || 85),
};

function gzipSizeKb(buffer) {
  return zlib.gzipSync(buffer).length / KB;
}

function readAssets() {
  if (!fs.existsSync(DIST_ASSETS_DIR)) {
    throw new Error('Diretorio dist/assets nao encontrado. Rode "npm run build" antes de coletar KPIs.');
  }

  const files = fs.readdirSync(DIST_ASSETS_DIR);
  return files.map((fileName) => {
    const filePath = path.join(DIST_ASSETS_DIR, fileName);
    const content = fs.readFileSync(filePath);
    return {
      fileName,
      ext: path.extname(fileName),
      gzipKb: gzipSizeKb(content),
    };
  });
}

function readOptionalLighthouseSummary() {
  if (!fs.existsSync(LIGHTHOUSE_SUMMARY_PATH)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(LIGHTHOUSE_SUMMARY_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function toNumberOrNull(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return null;
  }
  return value;
}

function evaluateKpi({ name, value, target, comparator, source }) {
  if (value === null) {
    return {
      name,
      value,
      target,
      status: 'missing',
      source,
      alert: `Dados ausentes para ${name}`,
    };
  }

  const ok = comparator === 'lte' ? value <= target : value >= target;
  return {
    name,
    value,
    target,
    status: ok ? 'ok' : 'breach',
    source,
    alert: ok ? null : `${name} fora da meta`,
  };
}

function formatValue(value, suffix = '') {
  if (value === null) {
    return 'N/A';
  }
  return `${value.toFixed(2)}${suffix}`;
}

function ensureBuildDir() {
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
  }
}

function buildMarkdownReport(results) {
  const lines = [
    '# Frontend KPI Report',
    '',
    '| KPI | Valor | Meta | Status | Fonte |',
    '|---|---:|---:|---|---|',
  ];

  for (const item of results) {
    const suffix = item.name === 'performance_score' ? '' : item.name.includes('bundle') ? ' KB' : ' ms';
    lines.push(
      `| ${item.name} | ${formatValue(item.value, suffix)} | ${formatValue(item.target, suffix)} | ${item.status.toUpperCase()} | ${item.source} |`
    );
  }

  const alerts = results.filter((item) => item.alert);
  lines.push('', '## Alertas');

  if (alerts.length === 0) {
    lines.push('- Nenhum alerta ativo.');
  } else {
    for (const item of alerts) {
      lines.push(`- ${item.alert}`);
    }
  }

  return `${lines.join('\n')}\n`;
}

function main() {
  const assets = readAssets();
  const lighthouse = readOptionalLighthouseSummary();

  const totalJsGzipKb = assets.filter((asset) => asset.ext === '.js').reduce((acc, cur) => acc + cur.gzipKb, 0);

  const initialLoadMs = toNumberOrNull(lighthouse?.initialLoadMs);
  const interactionMs = toNumberOrNull(lighthouse?.interactionMs);
  const performanceScore = toNumberOrNull(lighthouse?.performanceScore);

  const results = [
    evaluateKpi({
      name: 'initial_load_ms',
      value: initialLoadMs,
      target: TARGETS.initialLoadMs,
      comparator: 'lte',
      source: lighthouse ? 'lighthouse-summary.json' : 'lighthouse-summary.json (ausente)',
    }),
    evaluateKpi({
      name: 'interaction_ms',
      value: interactionMs,
      target: TARGETS.interactionMs,
      comparator: 'lte',
      source: lighthouse ? 'lighthouse-summary.json' : 'lighthouse-summary.json (ausente)',
    }),
    evaluateKpi({
      name: 'bundle_size_gzip_kb',
      value: totalJsGzipKb,
      target: TARGETS.bundleSizeKb,
      comparator: 'lte',
      source: 'dist/assets',
    }),
    evaluateKpi({
      name: 'performance_score',
      value: performanceScore,
      target: TARGETS.performanceScore,
      comparator: 'gte',
      source: lighthouse ? 'lighthouse-summary.json' : 'lighthouse-summary.json (ausente)',
    }),
  ];

  ensureBuildDir();

  const reportPayload = {
    generatedAt: new Date().toISOString(),
    targets: TARGETS,
    results,
  };

  fs.writeFileSync(KPI_REPORT_JSON_PATH, JSON.stringify(reportPayload, null, 2));
  fs.writeFileSync(KPI_REPORT_MD_PATH, buildMarkdownReport(results));

  console.log('\nFrontend KPI monitor\n');
  for (const item of results) {
    console.log(`${item.status.toUpperCase()} - ${item.name}: ${formatValue(item.value)} (meta: ${formatValue(item.target)})`);
  }

  const hardBreaches = results.filter((item) => item.status === 'breach');
  if (hardBreaches.length > 0) {
    process.exitCode = 1;
    return;
  }

  console.log('\nRelatorio salvo em build/performance-kpi-report.{json,md}');
}

main();
