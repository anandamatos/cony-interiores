import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const BUILD_DIR = path.resolve(ROOT_DIR, 'build');
const SOURCE_PATH = path.resolve(BUILD_DIR, 'loading-metrics-source.json');
const REPORT_JSON_PATH = path.resolve(BUILD_DIR, 'loading-metrics-report.json');
const REPORT_MD_PATH = path.resolve(BUILD_DIR, 'loading-metrics-report.md');

const TARGETS = {
  chartLoadMs: Number(process.env.KPI_TARGET_CHART_LOAD_MS || 500),
  filterApplyMs: Number(process.env.KPI_TARGET_FILTER_APPLY_MS || 350),
  renderMs: Number(process.env.KPI_TARGET_RENDER_MS || 900),
  mobilePerformanceScore: Number(process.env.KPI_TARGET_MOBILE_SCORE || 80),
};

function ensureBuildDir() {
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
  }
}

function readSource() {
  if (!fs.existsSync(SOURCE_PATH)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(SOURCE_PATH, 'utf-8'));
  } catch {
    return null;
  }
}

function normalizeNumber(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return null;
  }
  return value;
}

function evaluate(name, value, target, mode) {
  if (value === null) {
    return {
      name,
      value,
      target,
      mode,
      status: 'missing',
      alert: `Dados ausentes para ${name}`,
    };
  }

  const ok = mode === 'lte' ? value <= target : value >= target;

  return {
    name,
    value,
    target,
    mode,
    status: ok ? 'ok' : 'breach',
    alert: ok ? null : `${name} fora da meta`,
  };
}

function format(value) {
  if (value === null) {
    return 'N/A';
  }
  return value.toFixed(2);
}

function unitFor(metricName) {
  if (metricName === 'mobile_performance_score') {
    return 'score';
  }
  return 'ms';
}

function buildMarkdown(results) {
  const lines = [
    '# Dashboard Loading Metrics Report',
    '',
    '| Metrica | Valor | Meta | Status |',
    '|---|---:|---:|---|',
  ];

  for (const item of results) {
    const unit = unitFor(item.name);
    lines.push(`| ${item.name} | ${format(item.value)} ${unit} | ${format(item.target)} ${unit} | ${item.status.toUpperCase()} |`);
  }

  lines.push('', '## Alertas');
  const alerts = results.filter((item) => item.alert);

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
  const source = readSource();

  const chartLoadMs = normalizeNumber(source?.chartLoadMs);
  const filterApplyMs = normalizeNumber(source?.filterApplyMs);
  const renderMs = normalizeNumber(source?.renderMs);
  const mobilePerformanceScore = normalizeNumber(source?.mobilePerformanceScore);

  const results = [
    evaluate('chart_load_ms', chartLoadMs, TARGETS.chartLoadMs, 'lte'),
    evaluate('filter_apply_ms', filterApplyMs, TARGETS.filterApplyMs, 'lte'),
    evaluate('render_ms', renderMs, TARGETS.renderMs, 'lte'),
    evaluate('mobile_performance_score', mobilePerformanceScore, TARGETS.mobilePerformanceScore, 'gte'),
  ];

  ensureBuildDir();

  const payload = {
    generatedAt: new Date().toISOString(),
    sourcePath: SOURCE_PATH,
    targets: TARGETS,
    results,
  };

  fs.writeFileSync(REPORT_JSON_PATH, JSON.stringify(payload, null, 2));
  fs.writeFileSync(REPORT_MD_PATH, buildMarkdown(results));

  console.log('\nLoading metrics monitor\n');
  for (const item of results) {
    console.log(`${item.status.toUpperCase()} - ${item.name}: ${format(item.value)} (meta: ${format(item.target)})`);
  }

  const breaches = results.filter((item) => item.status === 'breach');
  if (breaches.length > 0) {
    process.exitCode = 1;
    return;
  }

  console.log('\nRelatorios gerados em build/loading-metrics-report.{json,md}');
}

main();
