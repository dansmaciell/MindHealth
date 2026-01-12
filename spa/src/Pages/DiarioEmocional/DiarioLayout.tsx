import { Outlet } from "react-router-dom";
import HeaderDiario from "../../_components/HeaderDiario/HeaderDiario";

export default function DiarioLayout() {
  return (
    <div>
      <HeaderDiario />
      <Outlet />
    </div>
  );
}