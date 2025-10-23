import { Badge } from "lucide-react";

const feactureProducts = [
  {
    id: 1,
    name: "Verde Modular Chair",
    price: "$3.999",
    image: "./img/Feature1.jpg",
    Badge: "New",
    materials: ["Coper Frame", "Premiun Velvet"],
  },
  {
    id: 2,
    name: "Terracotta Cloud Chair",
    price: "€5,250",
    image: "./img/Feature2.jpg",
    badge: "New",
    materials: ["Copper Frame", "Terracotta Velvet"],
  },

  {
    id: 3,
    name: "Sage Copper Lounge",
    price: "€4,675",
    image: "./img/Feature3.jpg",
    badge: "Limited",
    materials: ["Copper Frame", "Sage Velvet"],
  },
];

function getBadgeColor(type) {
  const color = {
    New: "bg-green-600/70",
    Limited: "bg-yellow-500/80",
    Sale: "bg-red-600/80",
    Exclusive: "bg-purple-600/70",
  };
  return color[type] || "bg-gray-600/70";
}

export default function FeatureCollection() {
  return (
    <section className="max-w-screen-xl mx-auto mt-10 px-4 py-8 flex flex-col ">
      <div className="">
        <h2 className="text-3xl md:text-6xl font-thin ">Feature Collection</h2>
        <p className="max-w-xl mt-4 text-sm md:text-base text-gray-500">
          Discover our most beloved pieces, each crafted with meticulous
          attention to detail and timeles design principales.
        </p>
      </div>

      {/* Responsive grid: 1 column on mobile, 2 on small, 3 on large */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full">
        {feactureProducts.map((product) => {
          const badgeText = product.badge || product.Badge;
          return (
            <div
              key={product.id}
              className="w-full max-w-[384px] mx-auto relative overflow-hidden shadow-lg rounded-2xl flex flex-col cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              {/* responsive heights for different screens */}
              <div className="w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[556px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="block w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* badge on top-left (responsive sizing) */}
              {badgeText && (
                <div
                  className={`absolute left-4 top-4 ${getBadgeColor(
                    badgeText
                  )} text-white text-xs sm:text-sm px-3 py-1 rounded-full flex justify-center items-center gap-1`}
                >
                  <Badge size={12} />
                  <span className="">{badgeText}</span>
                </div>
              )}

              {/* Overlay: texto encima de la imagen (placement responsive) */}
              <div className="absolute left-0 right-0 bottom-0 p-4 text-white flex flex-col gap-1 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="m-0 text-base sm:text-lg md:text-xl">
                  {product.name}
                </h3>
                <p className="m-0 text-[0.85rem] sm:text-sm">
                  {Array.isArray(product.materials)
                    ? product.materials.join(", ")
                    : product.materials}
                </p>
                <p className="m-0 text-sm font-medium mt-1">{product.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
