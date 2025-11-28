import HeaderAdmin from "../../../_components/HeaderAdmin/HeaderAdmin"; // importe seu sidebar
import { Outlet } from "react-router-dom";

export default function PageBaseAdmin() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Conteúdo principal com sidebar + conteúdo */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar lateral fixa */}
        <HeaderAdmin />

        {/* Conteúdo principal que muda conforme rota */}
        <main className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}