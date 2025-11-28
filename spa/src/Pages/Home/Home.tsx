import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faLightbulb, faHandshake } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // se estiver usando React Router
import homeImage from "../../../public/imgs/criancas-africanas.png"; // substitua pelo caminho correto da imagem
import "./Home.scss";

const Home: React.FC = () => {
    return (
        <div>
            {/* Banner */}
            <section
                className="text-white text-center d-flex align-items-center"
                style={{
                    height: "100vh",
                    backgroundImage: `url(${homeImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="container">
                    <h1 className="display-4 fw-bold">Bem-vindo ao Instituto Lucas Silva</h1>
                    <p className="lead mt-3">
                        Transformando vidas através da educação e inclusão social.
                    </p>
                    <Link to="/quero-apoiar" className="btn btn-quero-apoiar mt-4">
                        Quero Apoiar
                    </Link>
                </div>
            </section>

            {/* Sobre */}
            <section className="py-5 bg-light text-center text-md-start">
                <div className="container">
                    <h2 className="mb-4 text-center">Sobre o Instituto</h2>
                    <p>
                        O Instituto Lucas Silva é uma organização sem fins lucrativos
                        dedicada a promover oportunidades para jovens em situação de
                        vulnerabilidade por meio de projetos sociais, educação e capacitação.
                    </p>
                </div>
            </section>

            {/* Missão, Visão, Valores */}
            <section className="py-5">
                <div className="container">
                    <h2 className="mb-4 text-center">Nossos Pilares</h2>
                    <div className="row text-center">
                        <div className="col-md-4 mb-4">
                            <FontAwesomeIcon icon={faLightbulb} size="3x" className="mb-3 text-primary" />
                            <h5>Missão</h5>
                            <p>Inspirar e capacitar jovens a transformarem seu futuro.</p>
                        </div>
                        <div className="col-md-4 mb-4">
                            <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3 text-success" />
                            <h5>Visão</h5>
                            <p>Ser referência nacional em inclusão e impacto social.</p>
                        </div>
                        <div className="col-md-4 mb-4">
                            <FontAwesomeIcon icon={faHandshake} size="3x" className="mb-3 text-warning" />
                            <h5>Valores</h5>
                            <p>Empatia, comprometimento, respeito e transparência.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
