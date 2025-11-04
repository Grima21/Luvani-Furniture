import { Truck, Rocket, ShieldCheck } from "lucide-react";
import HeroNav from "./Navbar";
export default function Hero() {
  return (
    <>
      <main className="w-full max-w-[1600px] min-h-screen flex items-start justify-center mx-auto pt-20 md:pt-20 px-4">
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[1600px] overflow-hidden">
            {/* <HeroNav /> */}
            <img
              src="./img/lunar-gray-interior.png"
              alt="Hero"
              className="w-full h-auto max-h-[80vh] object-cover rounded-md shadow-lg block mx-auto"
            />

            {/* Overlay: sitúa el contenido encima de la imagen, arriba a la izquierda */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 md:top-12 md:left-12  z-20">
              <h2 className="pointer-events-auto text-3xl md:text-4xl lg:text-6xl font-bold tracking-tighter- text-white text-left  ">
                Crafted to flow with your space.
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-white mt-3">
                Modern furniture built for real life.
              </p>
              <button className="p-4 h-12 mt-6 rounded-md text-sm md:text-lg text-center flex items-center justify-center bg-white cursor-pointer text-black tracking-wide hover:bg-gray-100">
                Find Your Next Piece
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
