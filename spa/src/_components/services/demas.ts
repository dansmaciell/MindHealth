export async function buscarUnidadesSaude() {
  try {
    const url = "https://localhost/api/unidades-saude";
    
    console.log(`📡 Buscando dados de: ${url}`);

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
      console.error(`⚠️ Erro HTTP: ${res.status}`);
      return [];
    }

    const json = await res.json();
    console.log("✅ Dados recebidos:", json);

    
    return json.data ?? [];

  } catch (error) {
    console.error("❌ Erro de conexão (Provável CORS ou Certificado):", error);
    return [];
  }
}