import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Box } from "lucide-react";

export function NavbarAdmin() {
  const location = useLocation();
  //funciones para comprobar la ruta actul.
  const esPanel = location.pathname == "/admin";
  const esInventario = location.pathname === "/admin/inventario";

  return (
    <header className="w-full border-b-[1px] border-gray-300 py-2 flex justify-around items-center">
      <h1 className="text-center text-2xl font-bold tracking-wide">Luvani</h1>
      <div className="flex items-center gap-1 rounded-full border border-border bg-white p-1 shadow-sm">
        <Link
          to={"/admin"}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors  flex gap-2 items-center
            ${esPanel ? "bg-black/85 text-white shadow-sm" : "text-gray-500 hover: text-black"}`}
        >
          <LayoutGrid size={18} />
          Panel de Control
        </Link>
        <Link
          to={"/admin/inventario"}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors  flex gap-2 items-center
            ${esInventario ? "bg-black/85 text-white shadow-sm" : "text-gray-500 hover: text-black"}`}
        >
          <Box size={18} />
          Invetario
        </Link>
      </div>
    </header>
  );
}
