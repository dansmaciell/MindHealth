import Footer from "../../_components/Footer/Footer";
import Header from "../../_components/Header/Header";
import { Outlet } from "react-router-dom";

export default function PageBase() {

  return (
    <main>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}