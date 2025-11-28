import { useEffect, useState } from "react";
import CardProjetos from "../../_components/CardProjetos/CardProjetos.tsx";
import styles from "./ProjetosStyle.module.scss";
import apiService from "../../services/ApiService"; // ajuste o caminho se precisar

// Interface para tipar o projeto conforme os dados que o backend retorna
interface Projeto {
  id: number;
  titulo: string;
  publico_alvo: string;
  data_inscricao: string;
  data_inicio: string;
  vagas: number;
  imagem: string; // pode ser URL da imagem
}

export default function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function formatDate(dateString: string | null | undefined): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // mês começa em 0
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    async function fetchProjetos() {
      try {
        setLoading(true);
        const response = await apiService.get("/api/listar-projetos");

        // assumindo que os dados vêm em response.data.projetos (ajuste conforme seu backend)
        setProjetos(response.data.projetos);
        setError(null);
      } catch (err: any) {
        setError("Erro ao carregar projetos.");
      } finally {
        setLoading(false);
      }
    }

    fetchProjetos();
  }, []);

  if (loading) {
    return <p>Carregando projetos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.cardContainer}>
      {projetos.map((projeto) => (
        <CardProjetos
          key={projeto.id}
          titulo={projeto.titulo}
          publicoAlvo={projeto.publico_alvo}
          inscricao={formatDate(projeto.data_inscricao)}
          inicio={formatDate(projeto.data_inicio)}
          vagas={projeto.vagas}
          imagem={projeto.imagem}
          className={styles.tamanhoCard}
        />
      ))}
    </div>
  );
}
