import React from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

// --- DATOS DE FILTROS (Mantenidos en el archivo por simplicidad) ---
const FILTERS_LIST = [
  { name: "Product Type", icon: null },
  { name: "Furniture Material", icon: null },
  { name: "Fabric", icon: null },
  { name: "Width", icon: null },
  { name: "Color", icon: null },
  { name: "Wood Finish", icon: null },
];
// --- FIN DATOS DE FILTROS ---

// Este componente recibe las funciones de manejo de estado como props
export default function ProductFilterBar({ openFilter, setOpenFilter }) {
  // Función de manejo del despliegue del filtro (queda en este componente)
  const toggleFilter = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  return (
    <div className="w-full mt-5 mb-5">
      {/* Barra de filtros superiores (Tu UI principal) */}
      <div className="flex flex-wrap gap-3 mb-6">
        {FILTERS_LIST.map((filter) => (
          <button
            key={filter.name}
            onClick={() => toggleFilter(filter.name)}
            className={`px-4 py-2 border rounded hover:bg-gray-50 flex items-center gap-2 text-sm font-medium transition-colors 
                                    ${
                                      openFilter === filter.name
                                        ? "border-black bg-gray-100 text-black"
                                        : "border-gray-300 bg-white text-gray-700"
                                    }`}
          >
            {filter.name}
            <ChevronDown className="w-4 h-4" />
          </button>
        ))}

        <button className="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700">
          <SlidersHorizontal className="w-4 h-4" />
          All filters
        </button>
      </div>

      {/* NO incluye la lógica de paneles desplegables CheckboxGrid/FilterPanel aquí */}
    </div>
  );
}
