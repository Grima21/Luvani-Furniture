import React, { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";

const FurnitureFilters = () => {
  const [openFilter, setOpenFilter] = useState("Product Type");
  const [selectedFilters, setSelectedFilters] = useState({});

  const filters = [
    { name: "Product Type", icon: null },
    { name: "Furniture Material", icon: null },
    { name: "Fabric", icon: null },
    { name: "Width", icon: null },
    { name: "Color", icon: null },
    { name: "Wood Finish", icon: null },
  ];

  const productTypes = [
    { name: "Sectional", count: 384 },
    { name: "Sofa", count: 230 },
    { name: "Coffee Table", count: 196 },
    { name: "Media Console", count: 95 },
    { name: "Chair", count: 329 },
    { name: "Side Tables", count: 222 },
    { name: "Bookcase", count: 70 },
    { name: "Ottoman", count: 178 },
    { name: "Cabinet", count: 12 },
    { name: "Entryway Cabinet", count: 2 },
    { name: "Stool", count: 12 },
    { name: "Console Table", count: 99 },
    { name: "Desk", count: 4 },
    { name: "Daybed", count: 9 },
    { name: "Bench", count: 54 },
    { name: "Shelving", count: 11 },
    { name: "Shelving Set", count: 6 },
    { name: "Buffet", count: 3 },
  ];

  const furnitureMaterials = [
    { name: "Wood", count: 856 },
    { name: "Metal", count: 423 },
    { name: "Upholstered", count: 612 },
    { name: "Glass", count: 189 },
    { name: "Leather", count: 267 },
    { name: "Fabric", count: 534 },
    { name: "Marble", count: 145 },
    { name: "Rattan", count: 98 },
    { name: "Wicker", count: 76 },
    { name: "Plastic", count: 54 },
    { name: "Stone", count: 32 },
    { name: "Concrete", count: 28 },
  ];

  const fabricTypes = [
    { name: "Linen", count: 234 },
    { name: "Velvet", count: 189 },
    { name: "Cotton", count: 312 },
    { name: "Polyester", count: 267 },
    { name: "Microfiber", count: 156 },
    { name: "Chenille", count: 98 },
    { name: "Wool", count: 87 },
    { name: "Silk", count: 45 },
    { name: "Tweed", count: 67 },
    { name: "Bouclé", count: 123 },
    { name: "Performance Fabric", count: 201 },
    { name: "Outdoor Fabric", count: 89 },
  ];

  const widthRanges = [
    { name: 'Under 30"', count: 145 },
    { name: '30" - 50"', count: 298 },
    { name: '50" - 70"', count: 412 },
    { name: '70" - 90"', count: 356 },
    { name: '90" - 110"', count: 234 },
    { name: '110" - 130"', count: 167 },
    { name: 'Over 130"', count: 89 },
  ];

  const colors = [
    { name: "White", count: 423, color: "#FFFFFF" },
    { name: "Black", count: 367, color: "#000000" },
    { name: "Gray", count: 512, color: "#6B7280" },
    { name: "Beige", count: 289, color: "#D4C5B9" },
    { name: "Brown", count: 345, color: "#8B4513" },
    { name: "Blue", count: 267, color: "#3B82F6" },
    { name: "Green", count: 198, color: "#10B981" },
    { name: "Navy", count: 156, color: "#1E3A8A" },
    { name: "Cream", count: 234, color: "#FFFDD0" },
    { name: "Charcoal", count: 189, color: "#36454F" },
    { name: "Tan", count: 167, color: "#D2B48C" },
    { name: "Pink", count: 98, color: "#EC4899" },
  ];

  const woodFinishes = [
    { name: "Natural", count: 312 },
    { name: "Walnut", count: 267 },
    { name: "Oak", count: 289 },
    { name: "Espresso", count: 234 },
    { name: "Cherry", count: 178 },
    { name: "Mahogany", count: 145 },
    { name: "White Wash", count: 198 },
    { name: "Gray Wash", count: 167 },
    { name: "Black", count: 156 },
    { name: "Honey", count: 134 },
    { name: "Distressed", count: 112 },
    { name: "Reclaimed", count: 89 },
  ];

  const toggleFilter = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const handleCheckbox = (category, item) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category]?.[item],
      },
    }));
  };

  return (
    <div className="w-full  mt-5 mb-5">
      {/* Barra de filtros superiores */}
      <div className="flex flex-wrap gap-3 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.name}
            onClick={() => toggleFilter(filter.name)}
            className="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 
                     flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors"
          >
            {filter.name}
            <ChevronDown className="w-4 h-4" />
          </button>
        ))}

        <button
          className="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 
                         flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          <SlidersHorizontal className="w-4 h-4" />
          All filters
        </button>
      </div>

      {/* Paneles desplegables para cada filtro */}
      {openFilter === "Product Type" && (
        <FilterPanel title="Product Type">
          <CheckboxGrid
            items={productTypes}
            category="Product Type"
            selectedFilters={selectedFilters}
            handleCheckbox={handleCheckbox}
          />
        </FilterPanel>
      )}

      {openFilter === "Furniture Material" && (
        <FilterPanel title="Furniture Material">
          <CheckboxGrid
            items={furnitureMaterials}
            category="Furniture Material"
            selectedFilters={selectedFilters}
            handleCheckbox={handleCheckbox}
          />
        </FilterPanel>
      )}

      {openFilter === "Fabric" && (
        <FilterPanel title="Fabric">
          <CheckboxGrid
            items={fabricTypes}
            category="Fabric"
            selectedFilters={selectedFilters}
            handleCheckbox={handleCheckbox}
          />
        </FilterPanel>
      )}

      {openFilter === "Width" && (
        <FilterPanel title="Width">
          <CheckboxGrid
            items={widthRanges}
            category="Width"
            selectedFilters={selectedFilters}
            handleCheckbox={handleCheckbox}
          />
        </FilterPanel>
      )}

      {openFilter === "Color" && (
        <FilterPanel title="Color">
          <div className="grid grid-cols-3 gap-x-8 gap-y-3">
            {colors.map((color) => (
              <label
                key={color.name}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedFilters["Color"]?.[color.name] || false}
                  onChange={() => handleCheckbox("Color", color.name)}
                  className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer
                           checked:bg-blue-600 checked:border-blue-600 
                           focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                />
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full border border-gray-300 shadow-sm"
                    style={{ backgroundColor: color.color }}
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {color.name} ({color.count})
                  </span>
                </div>
              </label>
            ))}
          </div>
        </FilterPanel>
      )}

      {openFilter === "Wood Finish" && (
        <FilterPanel title="Wood Finish">
          <CheckboxGrid
            items={woodFinishes}
            category="Wood Finish"
            selectedFilters={selectedFilters}
            handleCheckbox={handleCheckbox}
          />
        </FilterPanel>
      )}
    </div>
  );
};

// Componente reutilizable para el panel de filtro
const FilterPanel = ({ title, children }) => (
  <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
    <div className="flex items-center justify-between mb-4 pb-3 border-b">
      <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
        {title}
        <ChevronUp className="w-4 h-4" />
      </h3>
    </div>
    {children}
    <button
      className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700 
                     uppercase tracking-wide"
    >
      SEE MORE
    </button>
  </div>
);

// Componente reutilizable para el grid de checkboxes
const CheckboxGrid = ({ items, category, selectedFilters, handleCheckbox }) => (
  <div className="grid grid-cols-3 gap-x-8 gap-y-3">
    {items.map((item) => (
      <label
        key={item.name}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <input
          type="checkbox"
          checked={selectedFilters[category]?.[item.name] || false}
          onChange={() => handleCheckbox(category, item.name)}
          className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer
                   checked:bg-blue-600 checked:border-blue-600 
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        />
        <span className="text-sm text-gray-700 group-hover:text-gray-900">
          {item.name} ({item.count})
        </span>
      </label>
    ))}
  </div>
);

export default FurnitureFilters;
