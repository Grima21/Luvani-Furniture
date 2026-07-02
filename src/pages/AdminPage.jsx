import { Section } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Description } from "@headlessui/react";
import { useProductos } from "../hooks/useProductos";
import { LayoutGrid, Box } from "lucide-react";
import { NavbarAdmin } from "../components/NavbarAdmin";
import { useNavigate, Link } from "react-router-dom";

export default function AdminPage() {
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("/img/pistacho-sofa.jpg");
  const [productDelete, setProductDelete] = useState(null);
  const { productos, loading, refrescarProductos } = useProductos();
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

      const { data: perfil } = await supabase
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

  const openDeleteModal = (id) => {
    setProductDelete(id);
  };

  const confirmDelete = async () => {
    if (productDelete) {
      try {
        const { error } = await supabase
          .from("productos")
          .delete()
          .eq("id", productDelete);

        if (error) {
          console.error("Error al eliminar:", error.message);
          setError("No se pudo eliminar el producto.");
          return;
        }
        console.log("Producto eliminado con exito.");
        await refrescarProductos();
        setProductDelete(null);
      } catch (err) {
        console.error("Error en el catch de eliminar", err);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  const [formDatas, setFormDatas] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDatas({
      ...formDatas,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { name, price, category, description } = formDatas;
    const formData = new FormData(e.target);

    const imageFile = formData.get("productImage");

    if (
      !name ||
      !price ||
      !category ||
      !description ||
      !imageFile ||
      imageFile.size === 0
    ) {
      setError("Please complete all fields and select a valid image.");
      return;
    }

    try {
      const fileExtension = imageFile.name.split(".").pop();
      const nombreUnico = `${Date.now()}.${fileExtension}`;

      console.log(
        "Intentando subir archivo:",
        nombreUnico,
        "Tipo",
        imageFile.type,
      );

      // 1. Sube el archivo físico al Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("imagenes-productos")
        .upload(nombreUnico, imageFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: imageFile.type,
        });

      if (uploadError) {
        console.log("detalle del error de Storage:", uploadError);
        setError("StorageError", uploadError.message);
        return;
      }

      // 2. Obtiene la URL pública del archivo subido
      const { data: urlData } = supabase.storage
        .from("imagenes-productos")
        .getPublicUrl(nombreUnico);

      const imageUrl = urlData.publicUrl;

      // 3. Inserta los datos de texto en la tabla
      const { data, error: insertError } = await supabase
        .from("productos")
        .insert([
          {
            name: name,
            price: parseFloat(price),
            category: category,
            description: description,
            image: imageUrl,
          },
        ]);

      if (insertError) {
        console.log("Detalle de error de Insert:", insertError);
        setError(`Database Error: ${insertError.message}`);
        return;
      }
      console.log("Todo guardo con exito!");
      await refrescarProductos();
      setFormDatas({
        name: "",
        price: "",
        category: "",
        description: "",
      });
      setImagePreview("./img/pistacho-sofa.jpg");
      e.target.reset();
    } catch (err) {
      console.log("Error capturado en el catch:", err);
      setError("Somenthin went wrong");
    }
  }

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
    <section className="w-full h-full mx-auto">
      <NavbarAdmin />

      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <section className="flex flex-col items-center">
            <h2 className="text-4xl text-center text-black font-semibold mb-2">
              Panel de control
            </h2>
            <p className="text-sm text-gray-500 text-center p-4">
              Agrega un nuevo articulo o la colección
            </p>
            <form
              className="max-auto max-w-2xl space-y-6"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="name"
                className="text-black text-lg font-semibold "
              >
                Name
              </label>
              <input
                id="name"
                placeholder="John Dinner"
                type="text"
                value={formDatas.name}
                name="name"
                onChange={handleChange}
                className="w-full h-10 rounded-xl border border-border shadow-sm  px-4 mb-6"
              />

              <div className="flex gap-4 w-full">
                <div className="w-full">
                  <label
                    htmlFor="category"
                    className="text-black text-lg font-semibold "
                  >
                    Categoria
                  </label>
                  <select
                    name="category"
                    value={formDatas.category}
                    id="category"
                    placeholder="Madera de roble"
                    type="text"
                    onChange={handleChange}
                    className="w-full h-10 rounded-xl border border-border shadow-sm  px-4 mb-6 bg-white"
                  >
                    <option value="">Selecciona una categoria</option>
                    <option value="madera roble">Madera de roble</option>
                    <option value="sofas">Sofas</option>
                    <option value="Madera premium">Madera Premium</option>
                    <option value="decoracion">Decoracion</option>
                  </select>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="text-black text-lg font-semibold "
                  >
                    Price
                  </label>
                  <input
                    name="price"
                    value={formDatas.price}
                    id="price"
                    placeholder="$200"
                    type="number"
                    onChange={handleChange}
                    className="w-full h-10 rounded-xl border border-border shadow-sm  px-4 mb-6"
                  />
                </div>
              </div>
              <label
                htmlFor="description"
                className="text-black text-lg font-semibold "
              >
                Descripción
              </label>

              <textarea
                placeholder="describre el articulo."
                name="description"
                value={formDatas.description}
                id="description"
                type="text"
                onChange={handleChange}
                className="w-full  min-h-24 resize-none rounded-xl border border-border shadow-sm px-4 py-3 mb-6"
              />
              <label
                htmlFor="image"
                className="text-black text-lg font-semibold "
              >
                Image
              </label>
              <input
                name="productImage"
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full mb-6 rounded-lg  px-4 py-3 text-sm text-gray-700 transition file:mr-4 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:text-white file:font-semibold file:cursor-pointer"
              />
              <button
                type="submit"
                className="w-full py-4 bg-black/80 rounded-lg text-white hover:bg-gray-900"
              >
                Crear inventario{" "}
              </button>
            </form>
            {error && <p className="text-red-500 mt-4"> {error}</p>}
          </section>
          <aside className="space-y-6">
            <div className="min-w-[400px]  bg-white rounded-xl p-6 shadow-lg ">
              <p className="text-[#8a7f72] text-xs tracking-widest mb-4">
                VISTA PREVIA
              </p>
              <div className="flex flex-col bg-white ">
                <div className="w-full h-[250px] flex items-center justify-center overflow-hidden">
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src={imagePreview}
                    alt="Vista Previa"
                  />
                </div>
                <div className=" px-4 py-6">
                  <div className="flex items-center justify-between gap-2 ">
                    <h3 className="text-base font-medium leading-tight ">
                      {formDatas.name}
                    </h3>
                    <span className="text-sm font-semibold whitespace-nowrap">
                      ${formDatas.price}
                    </span>
                  </div>
                  <span className="bg-[#f0ebe0] text-gray-500 text-xs px-2 rounded-sm py-0.5 mb-2">
                    {formDatas.category}
                  </span>
                  <p className="text-xs leading-relaxed text-gray-500 mt-2">
                    {formDatas.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="min-w-[400px]  mt-5 bg-white rounded-xl shadow-lg">
              <div className=" px-6 py-4 flex justify-between items-center  ">
                <p className="text-[#8a7f72] text-xs tracking-widest ">
                  INVENTARIO
                </p>
                <span className="bg-black text-white font-medium px-2 py-0.5">
                  {productos.length}
                </span>
              </div>

              <ul className="">
                {productos.map((prod) => (
                  <li
                    key={prod.id}
                    className="flex items-center gap-2 px-6 py-3.5 group transition-colors hover:bg-white"
                  >
                    <div className="w-12 h-12 overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover rounded-md  "
                        src={prod.image}
                        alt={prod.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {prod.name}
                      </p>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs ">
                            {prod.category}
                          </span>
                          <span className="font-semibold text-xs">
                            {prod.price}
                          </span>
                        </div>
                        <button
                          onClick={() => openDeleteModal(prod.id)}
                          className="flex items-center justify-center text-[#f0ebe0] hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
                {productos.length === 0 && (
                  <p className="text-xs text-center text-gray-400 py-6">
                    No hay articulos en el inventario aun.
                  </p>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* MODAL DE CONFRIMACION */}

      {productDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#f0ebe0] p-6 rounded-xl shadow-xl max-w-sm w-full mx-4 border border-gray-300 transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-black mb-2">
              ¿Eliminar artículo?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Esta acción borrará permanentemente el producto del inventario de
              Luvani y no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setProductDelete(null)} // Cierra el modal sin hacer nada
                className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 rounded-lg text-sm font-medium border border-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete} // Ejecuta la eliminación real
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
