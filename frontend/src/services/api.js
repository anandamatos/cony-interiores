export async function getApiMessage(path) {
  const response = await fetch(`/api${path}`);

  if (!response.ok) {
    throw new Error("Falha na requisicao da API");
  }

  return response.json();
}
