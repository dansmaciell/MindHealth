import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTachometerAlt,
    faUsers,
    faFileAlt,
    faCog,
    faSignOutAlt,
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import "./HeaderAdminStyle.scss";
import { useAuth } from "../../contexts/AuthContext";

const AdminSidebar = () => {
    const location = useLocation();
    const [showSidebar, setShowSidebar] = useState(false);

    const menuItems = [
        { icon: faTachometerAlt, label: "Dashboard", path: "/admin" },
        { icon: faUsers, label: "Usuários", path: "/admin/usuarios" },
        { icon: faFileAlt, label: "Projetos", path: "/admin/projetos" },
        { icon: faCog, label: "Configurações", path: "/configuracoes" },
    ];

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const { logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();    // chama a função do contexto que já remove token e limpa user
        navigate("/admin/login");
    }

    const activeBgColor = "#A4CD3A";

    return (
        <>
            {/* Botão toggle visível só em telas pequenas */}
            <div className="d-md-none bg-dark text-white p-2">
                <button className="btn btn-outline-light" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>

            {/* Sidebar fixo em telas grandes ou offcanvas em telas pequenas */}
            <div
                className={`sidebar-container bg-dark text-white ${showSidebar ? "show-sidebar" : ""
                    }`}
            >
                <div className="p-4 border-bottom border-secondary d-flex justify-content-between align-items-center">
                    <h2 className="h5 fw-bold">Painel Admin</h2>
                    {/* Botão para fechar sidebar no mobile */}
                    <button
                        className="btn btn-outline-light d-md-none"
                        onClick={toggleSidebar}
                    >
                        &times;
                    </button>
                </div>

                <nav className="flex-grow-1 px-3 mt-3">
                    <ul className="nav flex-column">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;

                            return (
                                <li key={item.path} className="nav-item mb-2">
                                    <Link
                                        to={item.path}
                                        className="nav-link d-flex align-items-center px-3 py-2 rounded text-white"
                                        style={{
                                            backgroundColor: isActive ? activeBgColor : "transparent",
                                            color: "white",
                                            WebkitTextFillColor: "white"
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                                        }}
                                    >
                                        <FontAwesomeIcon icon={item.icon} className="me-2 text-white" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-3 border-top border-secondary">
                    <button
                        className="btn w-100 d-flex align-items-center text-white"
                        style={{ backgroundColor: "transparent" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = activeBgColor)}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        onClick={handleLogout}
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                        Sair
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;
