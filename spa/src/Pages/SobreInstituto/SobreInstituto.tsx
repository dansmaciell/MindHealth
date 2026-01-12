import React from 'react';
import styles from './SobreInstituto.module.scss';
// Importe a imagem que representa o Mind Health (ex: um ícone de mente/coração/equilíbrio)
// Para este exemplo, usarei um caminho placeholder.
const MindHealthImage = '/imgs/logo_ofc_2.png'; 

export default function SobreInstituto () {
    return (
        <section className={styles.sobreSection}>
            <div className={styles.container}>
                <h2 className={styles.tituloPrincipal}>
                    SOBRE O PROJETO <span className={styles.destaqueCiano}>MIND HEALTH</span>
                </h2>

                <div className={styles.conteudoGrid}>
                    {/* COLUNA DE TEXTO 1: A Missão e o Problema */}
                    <div className={styles.colunaTexto}>
                        <p className={styles.paragrafo}>
                            O Mind Health nasce da necessidade urgente de combater o aumento de transtornos psicológicos no cenário atual. De acordo com a OMS, quase 1 bilhão de pessoas viviam com transtornos mentais em 2019, e essa carga continua a crescer, especialmente após a pandemia.
                        </p>
                        <p className={styles.paragrafo}>
                            Nossa missão é desenvolver uma Plataforma Web acessível, segura e acolhedora, voltada ao público-geral, para promover a conscientização e o auxílio nos cuidados com a saúde mental. Acreditamos que o bem-estar emocional deve ser um direito universal.
                        </p>
                    </div>

                    {/* COLUNA DE IMAGEM/DESTAQUE */}
                    <div className={styles.colunaDestaque}>
                        <img 
                            src={MindHealthImage} 
                            alt="Ícone de bem-estar e tecnologia" 
                            className={styles.imagemDestaque}
                        />
                        <p className={styles.missaoDestaque}>
                            Plataforma Web para Promoção da Saúde Mental e Apoio a Pessoas com Transtornos Mentais.
                        </p>
                    </div>
                </div>

                {/* OBJETIVOS E FUNCIONALIDADES */}
                <div className={styles.funcionalidades}>
                    <h3 className={styles.subtitulo}>Nossos Objetivos e Funcionalidades Chave</h3>
                    <ul className={styles.listaObjetivos}>
                        <li>
                            <span className={styles.icone}>💡</span>
                            <strong>Conscientização:</strong> Oferecer conteúdos educativos e informativos para reduzir o estigma social.
                        </li>
                        <li>
                            <span className={styles.icone}>📝</span>
                            <strong>Diário Emocional:</strong> Ferramenta central para o usuário registrar sentimentos e monitorar o humor (Autogerenciamento).
                        </li>
                        <li>
                            <span className={styles.icone}>🧘‍♀️</span>
                            <strong>Auxilio:</strong> Disponibilizar números de emergência e mapa com locais de acolhimento público (unidades de saúde próximas) .
                        </li>
                        <li>
                            <span className={styles.icone}>🌐</span>
                            <strong>Acessibilidade:</strong> Desenvolvida utilizando tecnologias modernas para garantir usabilidade e segurança de dados (LGPD).
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}