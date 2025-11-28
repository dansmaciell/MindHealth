import styles from './SobreInstituto.module.scss'

export default function SobreInstituto () {
    return (
        <div className={styles.container}>
            <h2 className='text-center mb-5'>Sobre o Instituto Lucas Silva</h2>

            <p>
                O Instituto Lucas Silva é uma organização da sociedade civil, sem fins lucrativos,
                que atua com o compromisso de transformar realidades e promover o desenvolvimento humano de jovens em situação de vulnerabilidade social.
                Fundado com a missão de oferecer novas perspectivas de vida, o Instituto investe em projetos voltados para a educação,
                capacitação profissional e inclusão social.
            </p>

            <p>
                Com foco no fortalecimento de comunidades e na valorização do potencial da juventude,
                o Instituto desenvolve ações que buscam garantir o acesso a oportunidades educativas de qualidade, oficinas de formação técnica,
                acompanhamento psicossocial e programas de mentoria. Além disso, promove atividades culturais, esportivas e de cidadania,
                criando um ambiente acolhedor e inspirador onde os jovens possam descobrir seus talentos, desenvolver suas habilidades e
                construir um futuro mais promissor.
            </p>

            <p>
                Acreditando que a transformação social começa pela educação e pelo acesso igualitário a oportunidades,
                o Instituto Lucas Silva atua em parceria com escolas, empresas, voluntários e organizações públicas e privadas,
                formando uma rede de apoio sólida e comprometida com a construção de uma sociedade mais justa e inclusiva.
            </p>

            <p>
                Por meio do trabalho contínuo e engajado de sua equipe e colaboradores, o Instituto tem impactado positivamente a vida de centenas de jovens,
                oferecendo não apenas capacitação, mas também esperança, pertencimento e protagonismo.
            </p>
        </div>
    );
}