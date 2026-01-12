import React, { useState, useEffect } from "react";
import Button from "../../_components/Button/Button";
import homeImage from "../../../public/imgs/fundot3.png"; 
import "./Home.scss";
import { noticias } from "../../_utils/noticias";
import { tccLista } from "../../_utils/tccLista";
import { numLista } from "../../_utils/numLista";
import Map from "../../_components/Maps/Maps";

const Home: React.FC = () => {
    // Lógica para responsividade
    const [itensPorTela, setItensPorTela] = useState(3);

    // --- ESTADOS SEPARADOS (AQUI ESTÁ A MÁGICA) ---
    // 1. Estado para o Blog (e TCC, se quiser que andem juntos)
    const [blogIndex, setBlogIndex] = useState(0);
    // 2. Estado EXCLUSIVO para os Telefones
    const [telIndex, setTelIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => setItensPorTela(window.innerWidth < 992 ? 1 : 3);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- FUNÇÕES DE NAVEGAÇÃO DO BLOG ---
    const handleBlogNext = () => {
        const nextIndex = blogIndex + itensPorTela;
        setBlogIndex(nextIndex >= noticias.length ? 0 : nextIndex);
    };

    const handleBlogPrev = () => {
        const prevIndex = blogIndex - itensPorTela;
        setBlogIndex(prevIndex < 0 ? Math.max(0, noticias.length - itensPorTela) : prevIndex);
    };

    // --- FUNÇÕES DE NAVEGAÇÃO DOS TELEFONES ---
    const handleTelNext = () => {
        const nextIndex = telIndex + itensPorTela;
        setTelIndex(nextIndex >= numLista.length ? 0 : nextIndex);
    };

    const handleTelPrev = () => {
        const prevIndex = telIndex - itensPorTela;
        setTelIndex(prevIndex < 0 ? Math.max(0, numLista.length - itensPorTela) : prevIndex);
    };

    // Fatiando as listas com seus índices respectivos
    const noticiasVisiveis = noticias.slice(blogIndex, blogIndex + itensPorTela);
    const tccVisiveis = tccLista.slice(blogIndex, blogIndex + itensPorTela); // Mantive atrelado ao blog, mas pode separar se quiser
    
    // Agora a lista de telefones usa o 'telIndex'
    const numVisiveis = numLista.slice(telIndex, telIndex + itensPorTela);

    // Funções auxiliares
    const handleLink = (url: string) => window.open(url, "_blank");
    const handleDownloadImage = (imagePath: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = imagePath;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="mind-home-wrapper">
            
            {/* --- 1. HERO SECTION --- */}
            <section className="mind-hero" style={{ backgroundImage: `url(${homeImage})` }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            
                            <h3 className="main-font text-uppercase mb-2 text-dark">
                                CONHEÇA O PROJETO MIND HEALTH
                            </h3>
                            
                            <h1 className="main-font display-3 fw-bold text-dark">
                                EXPLORANDO O <br />
                                <span className="text-ciano">CONTEÚDO</span>
                            </h1>
                            
                            <p className="main-font mt-4 text-dark mx-auto hero-desc fw-bold">
                                O PROJETO MIND HEALTH SURGIU COM O OBJETIVO DE PROMOVER A IMPORTÂNCIA DA SAÚDE MENTAL NOS DIAS ATUAIS, DISPONIBILIZANDO FERRAMENTAS E CONTEÚDOS PARA AUXILIAR O PÚBLICO DA MELHOR FORMA!
                            </p>

                            {/* CARD TCC */}
                            <div className="d-flex justify-content-center mt-5">
                                {tccVisiveis.map((item) => (
                                    <div key={item.id} className="mind-card tcc-card">
                                        <div className="img-container">
                                            <img src={item.img} alt={item.titulo} />
                                        </div>
                                        <div className="card-content text-center">
                                            <h5 className="main-font mb-2 fw-bold">{item.titulo}</h5>
                                            <p className="small text-secondary fw-bold mb-3">{item.data}</p>
                                            <Button
                                                text={'Baixar Documento'}
                                                style={{ width: '100%', borderRadius: '30px' }}
                                                onClick={() => handleDownloadImage('/docs/TCC_Robson_e_Daniel_final.pdf', 'TCC_Robson_e_Daniel.pdf')}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* --- 2. CONTEÚDOS EDUCACIONAIS --- */}
            <section className="mind-section container text-center">
                <h2 className="main-font fw-bold display-4 mb-5">
                    <b>Conteúdos educacionais sugeridos</b><br />
                    <b>sobre saúde mental 📚</b>
                </h2>

                {/* Bloco 1 */}
                <div className="row align-items-center mb-5 content-block">
                    <div className="col-lg-5 mb-4 mb-lg-0" style={{ backgroundColor: 'transparent' }}>
                        <img src="/imgs/crianca.png" alt="Criança" className="img-fluid rounded" />
                    </div>
                    
                    {/* CORREÇÃO: Removi 'text-lg-start'. Agora é sempre 'text-center' */}
                    <div className="col-lg-7 text-center">
                        <p className="content-text fw-bold">
                            Com objetivo de pautar temas do cotidiano dos estudantes nas aulas da Educação Básica, o IBGEeduca divulga materiais didáticos sobre Saúde mental no Brasil.
                        </p>
                        <div className="d-flex justify-content-center">
                            <Button 
                                text={'VER MAIS →'} 
                                onClick={() => handleLink('https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/43208-ibgeeduca-lanca-material-sobre-saude-mental-de-estudantes')} 
                                style={{ padding: '8px 25px', fontSize: '0.9rem', width: 'fit-content', minWidth: 'auto' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Bloco 2 */}
                <div className="row align-items-center mb-5 content-block flex-lg-row-reverse">
                    <div className="col-lg-5 mb-4 mb-lg-0">
                        <img src="/imgs/terapiat.png" alt="Terapia" className="img-fluid rounded" />
                    </div>
                    
                    {/* CORREÇÃO: Removi 'text-lg-start'. Agora é sempre 'text-center' */}
                    <div className="col-lg-7 text-center">
                        <p className="content-text fw-bold">
                            A cartilha Saúde Mental na Escola foi elaborada pela UFSM para refletir sobre a saúde mental no ambiente escolar e prevenir sofrimento psíquico.
                        </p>
                        <div className="d-flex justify-content-center">
                            <Button 
                                text={'VER MAIS →'} 
                                onClick={() => handleLink('https://www.ufsm.br/app/uploads/sites/518/2020/05/Cartilha-Saude-Mental-na-Escola.pdf')} 
                                style={{ padding: '8px 25px', fontSize: '0.9rem', width: 'fit-content', minWidth: 'auto' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Bloco 3 */}
                <div className="row align-items-center content-block">
                    <div className="col-lg-5 mb-4 mb-lg-0">
                        <img src="/imgs/doutort.png" alt="Doutor" className="img-fluid rounded" />
                    </div>
                    
                    {/* CORREÇÃO: Removi 'text-lg-start'. Agora é sempre 'text-center' */}
                    <div className="col-lg-7 text-center">
                        <p className="content-text fw-bold">
                            Conteúdo da Organização Pan-Americana da Saúde (OPAS) explicando o que é saúde mental e ressaltando sua importância para o bem-estar coletivo.
                        </p>
                        <div className="d-flex justify-content-center">
                            <Button 
                                text={'VER MAIS →'} 
                                onClick={() => handleLink('https://www.paho.org/pt/topicos/saude-mental')} 
                                style={{ padding: '8px 25px', fontSize: '0.9rem', width: 'fit-content', minWidth: 'auto' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. BLOG --- */}
            <section id="blog-section" className="mind-section"> 
                <div className="container text-center">
                    <h2 className="main-font display-3 text-ciano mb-2 fw-bold">BLOG</h2>
                    <h3 className="main-font mb-5 fw-bold">PRINCIPAIS NOTÍCIAS</h3>

                    <div className="carousel-box">
                        {/* Aqui usamos as funções do BLOG */}
                        <button className="nav-btn" onClick={handleBlogPrev}>❮</button>
                        
                        <div className="cards-row">
                            {noticiasVisiveis.map((item) => (
                                <a key={item.id} className="mind-card blog-card" href={item.link} target="_blank" rel="noopener noreferrer">
                                    <div className="img-container">
                                        <img src={item.img} alt={item.titulo} />
                                    </div>
                                    <div className="card-content text-start">
                                        <h5 className="main-font fw-bold">{item.titulo}</h5>
                                        <p className="small text-secondary fw-bold">{item.data}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <button className="nav-btn" onClick={handleBlogNext}>❯</button>
                    </div>
                </div>
            </section>


           {/* --- 4. TELEFONES --- */}
            <section className="mind-section container text-center">
                <h2 className="main-font display-3 text-ciano mb-2 fw-bold">TELEFONES</h2>
                <h3 className="main-font mb-5 fw-bold">NÚMEROS DE EMERGÊNCIA</h3>

                <div className="carousel-box justify-content-center">
                    
                    {/* Botão ANTERIOR - Só aparece se estiver minimizado (itensPorTela === 1) */}
                    {itensPorTela === 1 && (
                        <button className="nav-btn" onClick={handleTelPrev}>❮</button>
                    )}

                    <div className="cards-row">
                        {numVisiveis.map((item) => (
                            <div key={item.id} className="mind-card tel-card">
                                <div className="img-container">
                                    <img src={item.img} alt={item.titulo} />
                                </div>
                                <div className="card-content text-start">
                                    <h5 className="main-font fw-bold">{item.titulo}</h5>
                                    <p className="small text-secondary fw-bold">{item.numero}</p>
                                    <div className="mt-3 text-center">
                                        <Button 
                                            text={'VER MAIS'} 
                                            onClick={() => handleLink(item.link || '#')} 
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botão PRÓXIMO - Só aparece se estiver minimizado (itensPorTela === 1) */}
                    {itensPorTela === 1 && (
                        <button className="nav-btn" onClick={handleTelNext}>❯</button>
                    )}

                </div>
            </section>


           {/* --- 5. MAPA --- */}
<section className="mind-section container">
    <div className="row align-items-center">
        {/* Mudei de 'text-lg-end' para 'text-lg-start' */}
        <div className="col-lg-5 text-center text-lg-start mb-4">
            <h2 className="main-font display-2 text-ciano fw-bold">LOCAIS</h2>
            <h3 className="main-font text-dark display-6 fw-bold">DE ACOLHIMENTO <span role="img" aria-label="hug">🤗</span></h3>
            <p className="main-font mt-3 lead fw-bold">
            <b>Neste local são demarcadas</b>
            <br />
            <b>unidades de saúde próximas a Você!</b>
            </p>
        </div>
        <div className="col-lg-7">
            <div className="map-box shadow">
                    <Map />
            </div>
        </div>
    </div>
</section>


            {/* --- 6. FALE CONOSCO --- */}
            <section id="fale-conosco" className="fale-conosco-bg">
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-lg-5 text-center text-lg-start mb-5 mb-lg-0">
                            <h1 className="main-font display-2 text-ciano fw-bold">FALE</h1>
                            <h2 className="main-font display-3 text-dark fw-bold">conosco<span className="emoji">📞</span></h2>
                            <p className="main-font lead mt-3 fw-bold">
                                <b>Preencha as informações e</b><br />
                                <b>informe suas dúvidas!</b>
                            </p>
                        </div>
                        <div className="col-lg-7">
                            <div className="form-box bg-white shadow rounded p-2">
                                <iframe
                                    src="https://docs.google.com/forms/d/e/1FAIpQLSd87tV8m2AbdMwEabnvXrV9UxH3vBUPM3dcb7KDklNZcmkGJQ/viewform?embedded=true"
                                    width="100%" height="600" frameBorder="0" marginHeight={0} marginWidth={0}
                                    title="Google Form"
                                >Carregando…</iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;