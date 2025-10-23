import { Truck, Rocket, ShieldCheck } from "lucide-react";
export default function Hero() {
  return (
    <>
      <header className="w-full h-16 flex items-center justify-between px-4 backdrop-blur-2xl bg-white-50/30 fixed top-0 z-50">
        <div className="w-full max-w-[1350px] mx-auto flex items-center justify-center">
          <a
            className="text-2xl font-semibold text-center text-white tracking-tighter"
            href="#"
          >
            Luvani
          </a>
        </div>
      </header>
      <main className="w-full min-h-screen flex items-center justify-center relative">
        <img
          src="./img/hero.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/20 -z-10" />
        <section className="w-full max-w-[1500px] relative z-10 flex flex-col items-center px-4">
          <h1 className="text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center mt-10 text-white drop-shadow-lg inline-block">
            Design furniture for
            <br /> spaces that breathe.
          </h1>
          <p className="text-center text-white mt-8 text-base md:text-lg">
            Designed in Belgium, crafted to endure — timeless pieces for modern
            living.
          </p>
        </section>
        {/* Mueve este div abajo, fuera de <section> */}
        <div className="backdrop-blur-xl bg-black/5 w-full max-w-lg md:min-w-96 h-16 absolute bottom-0 left-1/2 -translate-x-1/2 z-20 mb-5 rounded-lg flex flex-wrap md:flex-nowrap items-center justify-around px-2 md:px-6 gap-2 md:gap-4 text-white text-xs md:text-sm font-medium shadow-lg">
          <span className="flex gap-2 items-center text-xs md:text-sm text-gray-300">
            <Truck className="text-green-600" />
            free shipping
          </span>
          <span className="flex gap-2 items-center text-xs md:text-sm text-gray-300">
            <Rocket className="text-yellow-600" /> Fast Delivered
          </span>
          <span className="flex gap-2 items-center text-xs md:text-sm text-gray-300">
            <ShieldCheck className="text-blue-600" />
            Lifetime guarantee
          </span>
        </div>
      </main>
    </>
  );
}
