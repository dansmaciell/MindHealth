import Footer from "../../_components/Footer/Footer";
import Header from "../../_components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function PageBase() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/DiarioEmocional";

  return (
    <main>
      {!hideLayout && <Header />}
      <Outlet />
      {!hideLayout && <Footer />}
    </main>
  );
}