import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
    const contactInfo = [
        { label: "Contato", value: "mindhealthacademica@gmail.com", icon: faEnvelope },
        { label: "", value: "(61) 99883-4228", icon: faPhone },
        { label: "Local", value: "Formosa - GO", },
    ];

    const socialMedia = [
        { icon: faFacebookF, label: "Facebook", link: "#" },
        { icon: faLinkedinIn, label: "LinkedIn", link: "#" },
        { icon: faYoutube, label: "YouTube", link: "#" },
        { icon: faInstagram, label: "Instagram", link: "#" },
    ];
    
    // LINKS ATUALIZADOS PARA NAVEGAÇÃO CORRETA EM SPAS
    const navLinks = [
        // Assume que 'Sobre nós' é uma página separada
        { name: "Sobre nós", link: "/sobre-o-instituto" }, 
        
        // 'Entre em contato' usa a âncora da Home
        { name: "Entre em contato", link: "/#fale-conosco" }, 

        // 'Blog' usa a âncora da Home
        { name: "Blog", link: "/#blog-section" },

        // 'Início' volta para a Home e rola para o topo
        { name: "Início", link: "/#" }, 
    ];


    return (
        <footer className="footer-mindhealth text-white position-relative overflow-hidden pt-5">
            <div 
                className="position-absolute w-100 h-100" 
                style={{
                    top: 0, left: 0, 
                    zIndex: -1, 
                    backgroundImage: `url('../../../public/imgs/hero-meditation.jpg'), linear-gradient(to top, rgba(10, 25, 163, 0.69), rgba(4, 35, 119, 0.5))`,
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    filter: 'grayscale(30%) brightness(80%)'
                }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                
                <div className="row justify-content-between mb-4">

                    <div className="col-lg-3 col-md-12 d-flex align-items-start mb-4 mb-lg-0">
                        <div className="d-flex align-items-center">
                            {/* Aqui a porra da logo do footer */}
                            <img src="/imgs/logo_ofc_2.png" alt="Mind Health Logo" style={{ height: '30px' }} />
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-4 d-flex flex-column mb-4 mb-lg-0 align-items-md-start align-items-center text-center text-md-start">
                        {navLinks.map((item) => (
                            <a 
                                key={item.name} 
                                // USANDO O LINK CORRIGIDO A PARTIR DE '/'
                                href={item.link} 
                                className="text-white text-decoration-none py-1" 
                                style={{ fontSize: '1rem' }}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    <div className="col-lg-3 col-md-4 d-flex flex-column mb-4 mb-md-0 align-items-md-start align-items-center text-center text-md-start">
                        <h5 className="text-uppercase mb-2" style={{ fontSize: '1rem', fontWeight: 600 }}>Contato</h5>
                        {contactInfo.map((info) => (
                            <div key={info.value} className="d-flex align-items-center py-1">
                                {info.icon && <FontAwesomeIcon icon={info.icon} className="me-2" style={{ width: '15px' }} />}
                                <span style={{ fontSize: '1rem' }}>{info.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="col-lg-3 col-md-4 d-flex flex-column align-items-md-end align-items-center text-center text-md-end">
                        <h5 className="text-uppercase mb-2" style={{ fontSize: '1rem', fontWeight: 600 }}>Redes Sociais</h5>
                        <div className="d-flex gap-3">
                            {socialMedia.map((social) => (
                                <a key={social.label} href={social.link} className="text-white fs-5" aria-label={social.label}>
                                    <FontAwesomeIcon icon={social.icon} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <hr className="border-white opacity-50 my-4" />

                <div className="row py-3 align-items-center">
                    <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
                        <small style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                            &copy; {new Date().getFullYear()} MIND HEALTH. TODOS OS DIREITOS RESERVADOS.
                        </small>
                    </div>

                    <div className="col-md-6 text-center text-md-end">
                        <small style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                            DESENVOLVIDO POR DANIEL MACIEL E ROBSON RODRIGUES
                        </small> 
                    </div>
                </div>
            </div>
            
            <div className="pt-5" /> 
        </footer>
    );
};

export default Footer;