import styles from "./CardProjeto.module.scss";
import Button from "../Button/Button.tsx";

interface InterfaceProjeto {
    titulo: string;
    publicoAlvo: string;
    inscricao: string;
    inicio: string;
    vagas: number;
    imagem: string;
    className?: string;
}

export default function Projetos({
 titulo,
 publicoAlvo,
 inscricao,
 inicio,
 vagas,
 imagem,
 className,
}: InterfaceProjeto) {

    const baseURL = import.meta.env.VITE_BASE_URL;

    return (
        <div className={`${styles.cardProjetos} ${className || ''}`}>
            <div className={styles.image}>
                <img src={`${baseURL}/storage/${imagem}`} alt={titulo} />
            </div>

            <div className={styles.textoContainer}>
                <div className={styles.pair}>
                    <p style={{ fontSize: 20 }}>{titulo}</p>
                </div>

                <div className={styles.pair}>
                    <p>Público Alvo</p>
                    <p style={{ fontSize: 14 }}>{publicoAlvo}</p>
                </div>

                <div className={styles.pair}>
                    <p>Inscrição</p>
                    <p style={{ fontSize: 14 }}>{inscricao}</p>
                </div>

                <div className={styles.pair}>
                    <p>Início</p>
                    <p style={{ fontSize: 14 }}>{inicio}</p>
                </div>

                <div className={styles.pair}>
                    <p>Vagas</p>
                    <p style={{ fontSize: 14 }}>{vagas}</p>
                </div>
                <div className={styles.pair}>
                    <Button
                        text="Inscreva-se"
                        style={{ fontSize: 16, width: 150, height: 45, marginBottom: 10 }}
                    />
                </div>
            </div>
        </div>
    );
}