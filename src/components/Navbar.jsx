import { Fragment, useState } from "react";
import { User, Truck, ShoppingCart, MapPin } from "lucide-react";
import { Popover, PopoverPanel, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { PANEL_DATA } from "../Data/navData";
import MegaMenuPanel from "./MegaMenuPanel";

export default function Navbar() {
  const [hovered, setHovered] = useState(null);

  const navItems = Object.keys(PANEL_DATA);

  return (
    <header className="relative z-30 w-full h-16 pt-6 flex items-center justify-center md:pt-20 ">
      <section className="w-full mx-auto flex flex-col items-center justy gap-4">
        {/**(Contenido superior:Logo, iconos) */}
        <div className="w-full max-w-[1600px] mx-auto  flex items-center justify-center relative mt-9">
          <a
            className="text-4xl font-semibold text-center text-black tracking-widest"
            href="#"
          >
            Luvani
          </a>

          {/* Right aligned icons with gap-2 between them */}
          <div className="absolute top-1 -right-1 flex items-center gap-9 text-black">
            <a
              href=""
              className="flex flex-col items-center gap-1 text-black hover:text-gray-600"
            >
              <User />
              <span className="text-xs">Account</span>
            </a>
            <a
              href=""
              className="flex flex-col items-center gap-1 text-black hover:text-gray-600"
            >
              <Truck />
              <span className="text-xs">Track Order</span>
            </a>
            <a
              href=""
              className="flex flex-col items-center gap-1 text-black hover:text-gray-600"
            >
              <ShoppingCart />
              <span className="text-xs">Cart</span>
            </a>
            <a
              href=""
              className="flex flex-col items-center gap-1 text-black hover:text-gray-600"
            >
              <MapPin />
              <span className="text-xs">Store</span>
            </a>
          </div>
        </div>

        {/**Barra de navegacion inferiro (Mega menu) */}

        <div className="w-full h-12 mx-auto mt-6 flex items-center justify-center border-t-2 border-b-2 border-gray-300">
          <nav className="ml-10">
            <ul className="flex gap-10 text-sm font-medium">
              {navItems.map(
                (
                  item //'item' es ahora la clave, ej:"NEW"*
                ) => (
                  <li key={item} className="relative">
                    <Popover>
                      {({ open }) => (
                        <>
                          <Popover.Button
                            as={Link}
                            to={`/${item
                              .toLowerCase()
                              .replace(/ & /g, "-")
                              .replace(/ /g, "-")}`}
                            type="button"
                            onMouseEnter={() => setHovered(item)}
                            onMouseLeave={() => setHovered(null)}
                            className="text-black hover:text-gray-600 uppercase"
                          >
                            {item}
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            show={open || hovered === item}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <PopoverPanel
                              onMouseEnter={() => setHovered(item)}
                              onMouseLeave={() => setHovered(null)}
                              className="absolute left-0 top-full mt-2 w-[800px] z-50 bg-white border shadow-lg rounded-md"
                            >
                              {/*  REEMPLAZO CLAVE: Usamos el componente MegaMenuPanel,
                                 pasándole la data de PANEL_DATA[item] */}

                              <MegaMenuPanel panelSections={PANEL_DATA[item]} />
                            </PopoverPanel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </section>
    </header>
  );
}
