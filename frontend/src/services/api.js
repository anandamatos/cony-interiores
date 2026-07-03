const API_PREFIX = '/api';
const DEFAULT_TIMEOUT_MS = Number.parseInt(import.meta.env.VITE_API_TIMEOUT_MS || '10000', 10);

function normalizePath(path) {
  if (typeof path !== 'string' || !path.startsWith('/')) {
    throw new Error('O caminho da API deve comecar com "/".');
  }

  return path;
}

export async function getApiMessage(path) {
  const normalizedPath = normalizePath(path);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_PREFIX}${normalizedPath}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'same-origin',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error('Falha na requisicao da API');
    }

    return response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Tempo limite excedido na requisicao da API');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
