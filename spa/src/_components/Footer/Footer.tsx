import React from "react";
import logoBranca from "../../../public/imgs/logo-branca.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
    return (
        <footer style={{ backgroundColor: "#0F2743" }} className="text-white py-5">
            <div className="container">
                <div className="row mb-4 align-items-start">
                    {/* Logo + Nome */}
                    <div className="col-md-4 d-flex flex-column align-items-center justify-content-center text-center mb-4 mb-md-0">
                        <img src={logoBranca} alt="Logo" style={{ height: "80px" }} />
                        <h5 className="mt-3">Instituto Lucas Silva</h5>
                    </div>

                    {/* Informações de contato */}
                    <div className="col-md-4 d-flex flex-column align-items-center justify-content-center text-center text-md-start mb-4 mb-md-0">
                        <p className="mb-2">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                            Rua das Palmeiras, 123<br />
                            Bairro Jardim, Cidade - SP
                        </p>
                        <p className="mb-2">
                            <FontAwesomeIcon icon={faPhone} className="me-2" />
                            (11) 98765-4321
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                            contato@institutolucassilva.org
                        </p>
                    </div>

                    {/* Redes sociais */}
                    <div className="col-md-4 d-flex flex-column align-items-center justify-content-center text-center text-md-end">
                        <div className="d-flex justify-content-center justify-content-md-end gap-3">
                            <a href="#" className="text-white fs-5" aria-label="Facebook">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="#" className="text-white fs-5" aria-label="Instagram">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="border-light" />
                <div className="text-center">
                    <small>&copy; {new Date().getFullYear()} Instituto Lucas Silva. Todos os direitos reservados.</small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
