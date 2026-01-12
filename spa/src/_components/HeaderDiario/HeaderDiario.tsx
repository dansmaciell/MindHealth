import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import necessário para redirecionar
import './HeaderDiario.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function HeaderDiario() {
  const navigate = useNavigate(); // 2. Hook de navegação

  // 3. Função que realiza o logout
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Evita que o link recarregue a página

    // Limpa os dados de autenticação
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Se você estiver salvando dados do usuário também
    localStorage.removeItem('diarioTermosAceitos'); // Opcional: Se quiser que ele aceite os termos de novo ao relogar

    // Redireciona para a tela de login
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg header-custom">
      <div className="container-fluid"> 
        
        {/* LOGO */}
        <a className="navbar-brand" href="/home">
            <img src="/imgs/logo_ofc_2.png" alt="Logo Mind Health" className="logo-diario" />
        </a>

        {/* BOTÃO HAMBURGUER */}
        <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon" />
        </button>

        {/* ITENS DA DIREITA */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav d-flex flex-row align-items-center gap-4">
                
                {/* BOTÃO DE SAIR (LOGOUT) */}
                <li className="nav-item">
                    {/* Alterado de href="/logout" para onClick={handleLogout} */}
                    <a 
                        href="/" 
                        onClick={handleLogout} 
                        className="nav-link-custom text-white fs-5" 
                        aria-label="Sair do sistema"
                        title="Sair"
                        style={{ cursor: 'pointer' }}
                    >
                        <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                    </a>
                </li>

                {/* BOTÃO HOME */}
                <li className="nav-item">
                    <a href="/home" className="nav-link-custom text-white fs-5" aria-label="Voltar para Home" title="Home">
                        <FontAwesomeIcon icon={faHouse}/>
                    </a>
                </li>

            </ul>
        </div>

      </div>
    </nav>
  );
};