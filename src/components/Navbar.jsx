import { Fragment, useState } from "react";
import {
  User,
  Truck,
  ShoppingCart,
  MapPin,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";
import { Popover, PopoverPanel, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { PANEL_DATA } from "../Data/navData";
import MegaMenuPanel from "./MegaMenuPanel";

export default function Navbar() {
  const navItems = Object.keys(PANEL_DATA);

  const [hovered, setHovered] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items = [
    {
      title: "Account",
      icon: User,
      path: "/Login",
    },
    {
      title: "Track Order",
      icon: Truck,
    },
    {
      title: "Cart",
      icon: ShoppingCart,
    },
  ];
  // console.log(isMenuOpen);
  return (
    <header
      id="Home"
      className="relative z-30 w-full h-16 pt-6 flex items-center justify-center md:pt-20 "
    >
      <section className="w-full mx-auto flex flex-col items-center  gap-4">
        {/**(Contenido superior:Logo, iconos) */}
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-end   relative mt-9">
          {/* boton movil */}

          <button
            className="fixed left-4 flex items-center justify-center z-50 rounded-lg p-2 text-black md:hidden "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>

          {isMenuOpen && (
            <div className="fixed inset-0 z-30 bg-black/50 lg:hidden"></div>
          )}

          <a
            className="absolute left-1/2 top-0 -translate-x-1/2 text-4xl font-semibold text-center text-black tracking-widest"
            href="Home"
          >
            Luvani
          </a>

          <div className="flex items-center gap-6 text-black cursor-pointer">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="hidden md:flex items-center gap-2 p-2 hover-bg-gray-100 runded-leg text-black "
              >
                <item.icon className="w-5 h-5" />
                <span className="hidden lg:block text-xs">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/**Barra de navegacion inferiro (Mega menu) */}

        <div className="w-full h-12 hidden  mx-auto mt-6 md:flex items-center justify-center border-t-2 border-b-2 border-gray-300">
          <nav className="ml-10">
            <ul className="flex gap-10 text-sm font-medium">
              {}
              {navItems.map(
                (
                  item, //'item' es ahora la clave, ej:"NEW"*
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
                ),
              )}
            </ul>
          </nav>
        </div>
        {isMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto bg-white shadow-2xl border-t border-gray-200">
            <nav className="w-full py-5 px-3">
              <div className="mb-4 flex items-center justify-between px-2">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-700">
                  Menu
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <X size={18} />
                </button>
              </div>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item
                        .toLowerCase()
                        .replace(/ & /g, "-")
                        .replace(/ /g, "-")}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-black uppercase transition hover:bg-gray-100"
                    >
                      <span>{item}</span>
                      <ChevronRight size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </section>
    </header>
  );
}
