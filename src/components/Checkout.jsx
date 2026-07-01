import { Lock, ChevronLeft } from "lucide-react";
import { guardarPedidoEnSupabase } from "../lib/ordersService";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Checkout() {
  const [isSbmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();

    console.log("se presiono el boton");
    const formData = new FormData(e.target);
    const datos = {
      // user_id: user?.id,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      addressLine1: formData.get("addressLine1"),
      addressLine2: formData.get("addressLine2"),
      city: formData.get("city"),
      country: formData.get("country"),
      postalCode: formData.get("postalCode"),
    };
    const resultado = await guardarPedidoEnSupabase(datos);
    setIsSubmitting(false);
    if (resultado.success) {
      return alert("¡Pedido procesado con éxito! 🎉");
    } else {
      alert(
        "Hubo un problema al guardar tu pedido. Por favor, intenta de nuevo.",
      );
    }
  };
  return (
    <div className="w-full ">
      <header className="w-full border-b-2 border-gray-200">
        <div className="max-w-[1220px] mx-auto p-2 flex justify-between items-center">
          <button className=" text-xs flex gap-1 text-gray-400 md:text-md items-center hover:text-gray-500">
            <ChevronLeft size={20} />
            Back to bag
          </button>
          <h1 className="text-2xl text-center md:text-3xl font-bold tracking-wider">
            Luvani
          </h1>
          <div className="flex gap-2 items-center">
            <Lock className="text-gray-400" size={15} />
            <span className="hidden sm:inline text-gray-400 text-sm">
              Secure Checkout
            </span>
          </div>
        </div>
      </header>
      <main className="w-full max-w-[1220px] h-full p-2 mx-auto">
        <section>
          <div className="w-full p-2">
            <h2 className="text-lg font-bold tracking-wide mb-4">Contact</h2>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col ">
              <label
                htmlFor="email"
                className="text-sm text-gray-600 tracking-wide mb-2"
              >
                {" "}
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full py-2 rounded-sm border-2  border-gray-100 p-2 mb-4 focus:outline-none focus:border-black/40"
              />
              <label
                htmlFor="phone"
                className="text-sm text-gray-600 tracking-wide mb-2"
              >
                Phone number
              </label>
              <input
                className="w-full py-2 rounded-sm border-2  border-gray-100 p-2 mb-4 focus:outline-none focus:border-black/40"
                type="number"
                id="phone"
                name="phone"
                placeholder="6344-3135"
              />
              <h3 className="text-smd font-medium tracking-widest mb-4">
                SHIPPING ADDRESS
              </h3>
              <div className="flex gap-2">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm text-gray-600 tracking-wide mb-2"
                  >
                    First name
                  </label>
                  <input
                    className="w-full py-2 rounded-sm border-2  border-gray-100 p-2 mb-4 focus:outline-none focus:border-black/40"
                    type="text"
                    id="firstName"
                    name="firstName"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm text-gray-600 tracking-wide mb-2"
                  >
                    Last name
                  </label>
                  <input
                    className="w-full py-2 rounded-sm border-2  border-gray-100 p-2 mb-4 focus:outline-none focus:border-black/40"
                    type="text"
                    id="lastName"
                    name="lastName"
                  />
                </div>
              </div>
              <label
                htmlFor="addresLine1"
                className="text-sm text-gray-600 tracking-wide mb-2"
              >
                address
              </label>
              <input
                className="w-full py-2 rounded-sm border-2  border-gray-100 p-2 mb-4 focus:outline-none focus:border-black/40"
                type="text"
                id="addressLine1"
                name="addressLine1"
                placeholder="123 Main Street"
              />
              <label
                htmlFor="addressLine2"
                className="text-sm text-gray-600 tracking-wide mb-2"
              >
                Apt, suite, unit (optional)
              </label>
              <input
                className="w-full py-2 rounded-sm border-2  border-gray-100 p-2 mb-4 focus:outline-none focus:border-black/40"
                type="text"
                id="addressLine2"
                name="addressLine2"
                placeholder="123 Main Street"
              />
              <label
                htmlFor="city"
                className="text-sm text-gray-600 tracking-wide mb-2"
              >
                City
              </label>
              <input
                className="w-full py-2 rounded-sm border-2  border-gray-100 p-2 mb-4 focus:outline-none focus:border-black/40"
                type="text"
                id="city"
                name="city"
              />
              <div>
                <div>
                  <label
                    htmlFor="state"
                    className="text-sm text-gray-600 tracking-wide mb-2"
                  >
                    State/Province
                  </label>
                  <input
                    className="w-full py-2 rounded-sm border-2  border-gray-100 p-2 mb-4 focus:outline-none focus:border-black/40"
                    type="text"
                    name="state"
                    id="state"
                  />
                </div>
                <div>
                  <label
                    htmlFor="postalCode"
                    className="text-sm text-gray-600 tracking-wide mb-2"
                  >
                    Postal code
                  </label>
                  <input
                    className="w-full py-2 rounded-sm border-2  border-gray-100 p-2 mb-4 focus:outline-none focus:border-black/40"
                    type="text"
                    name="postalCode"
                    id="postalCode"
                  />
                </div>
              </div>
              <select
                name="country"
                id="country"
                name="country"
                className="text-sm text-gray-600 bg-white tracking-wide mb-2 py-2 rounded-sm border-2 border-gray-100"
              >
                <option value="Unite States">Unite State</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
                <option value="United kingdon">United Kingdon</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Spain">Spain</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Panama">Panamá</option>
              </select>
              <button
                disabled={isSbmitting}
                type="submit"
                className="py-4 bg-red-500 rounded-lg"
              >
                {isSbmitting ? "Procesando pedido..." : "Confirmar y pagar."}
              </button>
            </form>
          </div>
          <div></div>
        </section>
      </main>
    </div>
  );
}
