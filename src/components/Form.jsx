import { Mail } from "lucide-react";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Form() {
  // Form state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [honey, setHoney] = useState(""); // campo honeypot

  // normalizador
  const normalize = (v) => v.trim().toLowerCase();
  // error derivado (solo string cuando hay problema)

  const emailError = (() => {
    if (!email) return "El correo es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Usa un correo válido.";
    return "";
  })();

  //submit controlado
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    //verificacion honeypot
    if (honey) {
      console.warm("Honeyspot triggered, likely a bot");
      setStatus("success");
      setMessage("¡Gracias por suscribirte a nuestro boletín!");
      setEmail("");
      return;
    }

    if (emailError) {
      setStatus("error");
      setMessage(emailError);
      return;
    }
    if (setStatus === "loading") return;

    setStatus("loading");
    setMessage("");

    //insercion real en supabase
    const { error } = await supabase
      .from("subscriptions")
      .insert({ email: normalize(email) });

    if (error) {
      //duplicado por indice unico (Postgres)
      if (error.code === "23505") {
        setStatus("error");
        setMessage("Este correo ya está suscrito.");
      } else {
        setStatus("error");
        setMessage("Ups, algo salio mal. Intenta nuevamente.");
        console.log(error);
      }
      return;
    }

    setStatus("success");
    setMessage("¡Gracias por suscribirte a nuestro boletín!");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  const onInputChange = (v) => {
    const next = normalize(v);
    setEmail(next);
    if (status !== "idle") setStatus("idle");
  };
  // normalizador (evita espacios y mayúsculas)

  const disable = status === "Loading" || Boolean(emailError);

  return (
    <section className="max-w-2xl  rounded-xl p-8 mx-auto my-24  bg-[#fcfbf6] border border-gray-200 flex flex-col justify-center items-center gap-6">
      <h2 className="text-3xl font-light">
        <span className="font-semibold">Stay ahead</span> of quiete luxury
      </h2>
      <p className="max-w-lg text-pretty font-light mb-6 text-gray-500 text-center">
        Be the first to discover new collections, design insights, and exclusive
        acces to limited pieces.
      </p>
      {/* Form controlado */}
      <form onSubmit={handleSubmit} noValidate className="w-full">
        {/* Campo honeypot oculto */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-auto">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tableIndex={-1}
            autoComplete="organization"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-6 -translate-y-1/2 text-gray-300 w-5 h-5" />
        </div>
        <input
          id="email"
          type="email"
          placeholder=" Enter your email addres"
          className={`w-full h-12 pl-10 pr-4 py-2 border border-gray-300 rounded-2xl focus:outline-none transition ${
            status === "error"
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          value={email}
          onChange={(e) => onInputChange(e.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={Boolean(emailError)}
          aria-describedby="newsletter-msg"
          required
        />
        <button
          className="w-full h-12 bg-gray-950 mt-5 rounded-2xl text-white text-sm font-medium hover:bg-gray-800 transition-colors disablet:opacity-60"
          type="submit"
          disabled={disable}
        >
          {status === "loading" ? "Submitting..." : "Subcribe to Newsletter"}
        </button>
      </form>
      {/* Mensaje de estado */}
      <p
        id="newsletter-msg"
        className={`text-xs min-h-5 ${
          status === "error"
            ? "text-red-600"
            : status === "success"
            ? "text-green-600"
            : "text-gray-400"
        }`}
        aria-live="polite"
      >
        {status === "error" && message ? (
          message
        ) : status === "success" && message ? (
          message
        ) : (
          <>
            We respect your privacy. Unsubscribe at any time. Read our{" "}
            <a href="#" className="underline decoration-gray-500 decoration-1">
              Privacy policy
            </a>
          </>
        )}
      </p>
    </section>
  );
}
