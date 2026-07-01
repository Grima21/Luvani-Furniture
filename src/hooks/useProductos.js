import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.log("Error cargando inventario.", error);
      } else {
        setProductos(data || []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);
  return {
    productos,
    loading,
    refrescarProductos: fetchProductos,
  };
}
