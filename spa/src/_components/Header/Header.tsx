import React from "react";
import logo from "../../../public/imgs/logo.png";
import './Header.scss';

const Header: React.FC = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-custom shadow">
        <div className="container d-flex flex-column align-items-center">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
            <img
              src={logo}
              alt="Instituto Lucas Silva"
              style={{ height: "100px", marginRight: "10px" }}
            />
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

          <div className="collapse navbar-collapse justify-content-center mt-3" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/sobre-o-instituto">Sobre o instituto</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/projetos">Projetos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/quero-apoiar">Quero apoiar</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/fale-conosco">Fale conosco</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
