import api from './api';

const REQUEST_TIMEOUT_MESSAGE = 'Tempo limite excedido ao consultar APIs financeiras.';
const NETWORK_MESSAGE = 'Nao foi possivel conectar com as APIs financeiras.';

function extractErrorMessage(error, fallbackMessage) {
  if (error?.code === 'ECONNABORTED') {
    return REQUEST_TIMEOUT_MESSAGE;
  }

  const status = error?.response?.status;

  if (status === 400) {
    return error?.response?.data?.detail || 'Requisicao invalida para API financeira.';
  }

  if (status === 401) {
    return 'Autenticacao necessaria para acessar este recurso financeiro.';
  }

  if (status === 403) {
    return 'Voce nao possui permissao para acessar este recurso financeiro.';
  }

  if (status && status >= 500) {
    return 'API financeira indisponivel temporariamente.';
  }

  if (!status) {
    return NETWORK_MESSAGE;
  }

  return fallbackMessage;
}

function toHealthViewModel(payload) {
  return {
    service: payload?.service || 'financial-api',
    status: payload?.status || 'unknown',
    isHealthy: payload?.status === 'ok',
  };
}

function toPaymentSimulationViewModel(payload) {
  return {
    amount: Number(payload?.amount || 0),
    feeRate: Number(payload?.fee_rate || 0),
    feeAmount: Number(payload?.fee_amount || 0),
    netAmount: Number(payload?.net_amount || 0),
    currency: payload?.currency || 'BRL',
    provider: payload?.provider || 'internal-simulator',
  };
}

function toMonitoringDashboardViewModel(payload) {
  return {
    totalRequests: payload?.total_requests || 0,
    financialRequests: payload?.financial_requests || 0,
    financialErrorRequests: payload?.financial_error_requests || 0,
    p95LatencyMs: payload?.p95_latency_ms || 0,
    alertThresholdMs: payload?.financial_alert_threshold_ms || 0,
    generatedForUser: payload?.generated_for_user || null,
  };
}

function toWeeklyPlanningViewModel(payload) {
  const list = Array.isArray(payload) ? payload : [];
  return list.map((item) => ({
    period: item?.periodo || '-',
    total: Number(item?.valor_total || 0),
  }));
}

function toMonthlyPlanningViewModel(payload) {
  const list = Array.isArray(payload) ? payload : [];
  return list.map((item) => ({
    period: item?.periodo || '-',
    total: Number(item?.valor_total || 0),
  }));
}

function toForecastPaymentsViewModel(payload) {
  const list = Array.isArray(payload) ? payload : [];
  return list.map((item) => ({
    paymentId: item?.pagamento_id,
    serviceId: item?.servico_id,
    dueDate: item?.data_entrega,
    amount: Number(item?.valor || 0),
    status: item?.status || 'pendente',
  }));
}

export async function fetchFinancialHealth() {
  try {
    const response = await api.get('/financial/health/');
    return toHealthViewModel(response.data);
  } catch (error) {
    throw new Error(
      extractErrorMessage(error, 'Falha ao validar saude da API financeira.'),
      { cause: error }
    );
  }
}

export async function simulateFinancialPayment(payload, options = {}) {
  const { simulateDelayMs } = options;
  const params = {};

  if (Number.isFinite(simulateDelayMs) && simulateDelayMs > 0) {
    params.simulate_delay_ms = simulateDelayMs;
  }

  try {
    const response = await api.post('/financial/payments/simulate/', payload, { params });
    return toPaymentSimulationViewModel(response.data);
  } catch (error) {
    throw new Error(
      extractErrorMessage(error, 'Falha ao simular pagamento financeiro.'),
      { cause: error }
    );
  }
}

export async function fetchMonitoringDashboard() {
  try {
    const response = await api.get('/internal/monitoring/dashboard/');
    return toMonitoringDashboardViewModel(response.data);
  } catch (error) {
    throw new Error(
      extractErrorMessage(error, 'Falha ao carregar dashboard de monitoramento financeiro.'),
      { cause: error }
    );
  }
}

export async function fetchWeeklyPlanning() {
  try {
    const response = await api.get('/financial/payments/planejamento/semanal/');
    return toWeeklyPlanningViewModel(response.data);
  } catch (error) {
    throw new Error(
      extractErrorMessage(error, 'Falha ao carregar planejamento semanal.'),
      { cause: error }
    );
  }
}

export async function fetchMonthlyPlanning() {
  try {
    const response = await api.get('/financial/payments/planejamento/mensal/');
    return toMonthlyPlanningViewModel(response.data);
  } catch (error) {
    throw new Error(
      extractErrorMessage(error, 'Falha ao carregar planejamento mensal.'),
      { cause: error }
    );
  }
}

export async function fetchPaymentsForecast() {
  try {
    const response = await api.get('/financial/payments/previsao/');
    return toForecastPaymentsViewModel(response.data);
  } catch (error) {
    throw new Error(
      extractErrorMessage(error, 'Falha ao carregar previsao de pagamentos.'),
      { cause: error }
    );
  }
}
