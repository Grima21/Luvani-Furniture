import { useProductos } from "../hooks/useProductos";
import { NavbarAdmin } from "../components/NavbarAdmin";
import { Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export function InventarioPage() {
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verificarAccesoAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("1. Usuario autenticado ID:", user?.id);
      if (!user) {
        navigate("/login");
        return;
      }

      const { data: perfil, error } = await supabase
        .from("perfiles")
        .select("rol")
        .eq("id", user.id)
        .single();

      console.log(
        "2. Perfil devuelto de Supabase:",
        perfil,
        "Error si hay:",
        error,
      );

      if (error) {
        console.error("Error obteniendo perfil:", error);
        alert(
          "Ocurrió un error al verificar el perfil. Intenta nuevamente más tarde.",
        );
        navigate("/home");
        return;
      }

      if (!perfil || perfil.rol !== "admin") {
        alert(
          "Acceso denegado. No tienes permisos para acceder a esta pagina.",
        );
        navigate("/home");
      } else {
        setCargando(false);
      }
    };
    verificarAccesoAdmin();
  }, [navigate]);

  const [productoDelete, setProductoDelete] = useState(null);
  const { productos, loading, refrescarProductos } = useProductos();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProductos = productos.filter((prod) => {
    const nameMatch = prod.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch = prod.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch || categoryMatch;
  });

  const deleteProducto = async (id) => {
    try {
      const { error } = await supabase.from("productos").delete().eq("id", id);
      if (error) {
        console.log("Error al eliminar producto", error);
        return;
      }
      setProductoDelete(id);
      refrescarProductos();
    } catch (error) {
      console.log("Error al eliminar producto", error);
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbf9f4]">
        <p className="text-sm font-medium text-gray-500 animate-pulse">
          Verificando credenciales de seguridad...
        </p>
      </div>
    );
  }
  return (
    <section>
      <NavbarAdmin />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <h1 className="text-4xl font-bold ">Inventario</h1>
          <p className="text-sm text-gray-500">
            {productos.length} articulos en coleccion
          </p>
          <div className="relative w-full max-w-md mt-2">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={15}
            />
            <input
              type="text"
              placeholder="Buscar articulos..."
              className="w-full rounded-2xl shadow-sm border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-slate-500"
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {filteredProductos.map((prod) => (
            <article
              key={prod.id}
              className="group overflow-hidden rounded-3xl border border-border bg-[#fbf8f1] shadow-sm transition hover:shadow-md"
            >
              <div className="w-full h-full">
                <div>
                  <img
                    className="w-full object-cover"
                    src={prod.image}
                    alt={prod.name}
                  />
                </div>
                <div className="flex flex-col p-5 gap-2">
                  <div className="flex justify-between">
                    <h2 className="font-semibold text-xl">{prod.name}</h2>
                    <span className="shrink-0 rounded-full bg-[#f2ede2] px-2.5 py-1 text-xs font-semibold">
                      ${prod.price}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs tracking-wider uppercase font-medium text-[#878f65]">
                      {prod.category}
                    </p>
                    <p className="line-clamp-2 text-sm text-[#9a9286]">
                      {prod.description}
                    </p>
                    <button
                      onClick={() => deleteProducto(prod.id)}
                      className="mt-2 inline-flex items-center gap-1 text-xs text-[#9a9286] font-medium transition hover:text-red-500"
                    >
                      <Trash2 size={18} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </section>
  );
}
