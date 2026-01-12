import React from "react";
import logoBg from "../../../public/imgs/hero-meditation.jpg"; 
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    return (
        <div className="header-wrapper" style={{ backgroundImage: `url(${logoBg})` }}>
            
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
                <div className="container-fluid px-4 px-lg-5">
                    
                    <a className="navbar-brand d-lg-none" href="./home">
                        <img src="/imgs/logo_ofc_2.png" alt="Logo" className="logo-mobile" />
                    </a>

                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        
                        <ul className="navbar-nav navbar-left-custom me-auto">
                            <li className="nav-item"><a className="nav-link active" href="/DiarioEmocional">DIÁRIO EMOCIONAL</a></li>
                            <li className="nav-item"><a className="nav-link" href="/sobre-o-instituto">SOBRE NÓS</a></li>
                        </ul>

                        <a className="navbar-brand d-none d-lg-block mx-auto" href="./home">
                            <img src="/imgs/logo_ofc_2.png" alt="Logo" className="logo-desktop" />
                        </a>

                        <ul className="navbar-nav navbar-right-custom ms-auto">
                            <li className="nav-item"><a className="nav-link" href="/#fale-conosco">FALE CONOSCO</a></li>
                            <li className="nav-item"><a className="nav-link" href="/#blog-section">BLOG</a></li>
                            <li className="nav-item">
                                <a href="./src/pages/home" className="nav-link icon-home" aria-label="Homepage">
                                    <FontAwesomeIcon icon={faHouse} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="hero-container container-fluid px-4 px-lg-5">
                <div className="hero-content">
                    <h1>ENCONTRE CLAREZA</h1>
                    <h1><span className="highlight">COM</span> O DIÁRIO</h1>
                    
                    <div className="hero-buttons">
                        <a className="btn btn-custom-light me-lg-3 mb-3 mb-lg-0" href="/register">Registrar-se</a>
                        <a className="btn btn-custom-outline" href="/login">Entrar</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;