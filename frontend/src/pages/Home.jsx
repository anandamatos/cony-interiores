import { useEffect, useState } from "react";
import { getApiMessage } from "../services/api";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHello = async () => {
      try {
        const data = await getApiMessage("/hello/");
        setMessage(data.message);
      } catch (err) {
        setError("Nao foi possivel conectar ao backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchHello();
  }, []);

  return (
    <main style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h1>Bem-vindo ao Cony Interiores</h1>
      {loading && <p>Carregando integracao com backend...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && <p>Resposta da API: {message}</p>}
    </main>
  );
}
