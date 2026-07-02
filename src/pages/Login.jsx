import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { data, error: supabaseError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      console.log("error", supabaseError);
      if (supabaseError) {
        setError(supabaseError.message);
        return;
      }

      const { data: perfil, error: perfilError } = await supabase
        .from("perfiles")
        .select("rol")
        .eq("id", data.user.id)
        .single();

      if (perfilError || !perfil) {
        console.error("Error al obtener el pefil", perfilError);
        navigate("/home");
        return;
      }

      if (perfil.rol === "admin") {
        alert("Bienvenido al panel de control, Grimlado!");
        navigate("/admin");
        return;
      }

      setMessage("Login successfully! Redirecting...");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError(null);
    try {
      const { data, error: oAuthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // Lo mandamos al Home igual que en el registro
          redirectTo: `${window.location.origin}/home`,
        },
      });

      if (oAuthError) throw oAuthError;
    } catch (err) {
      console.error("Error en OAuth:", err.message);
      setError("No se pudo iniciar sesión con Google.");
    }
  }

  return (
    <section className="w-full min-h-screen h-full mx-auto">
      <header className="border-b-2 py-5">
        <h1 className="text-center text-black text-4xl font-bold ">Luvani</h1>
      </header>
      <div className="w-full max-w-[500px] flex justify-center items-center flex-col mx-auto py-10 gap-10  ">
        <div>
          <h2 className="text-4xl text-center text-black font-semibold mb-2">
            Bienvenido de nuevo
          </h2>
          <p className="text-sm text-gray-500">
            Inicia sesión para continuar con tu cuenta de Luvani
          </p>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-2"
        >
          <label className="text-black text-lg font-semibold" id="email">
            Correo electronico
          </label>
          <input
            className="w-full h-10 rounded-lg px-4"
            type="email"
            id="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-black text-lg font-semibold" id="password">
            Contraseña
          </label>
          <input
            className="w-full h-10 rounded-lg px-4"
            type="password"
            id="password"
            placeholder="*****"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-black/80 rounded-lg text-white py-2 mt-4"
          >
            Iniciar session
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {message && <p className="text-green-500 mt-4">{message}</p>}
        </form>
        <div className="flex items-center gap-2 w-full">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-sm text-gray-500">o</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className=" flex items-center justify-center gap-2 bg-white w-full py-3 rounded-lg text-black font-semibold border "
          >
            <img
              src="/img/logos/google.svg"
              className="w-5 h-5"
              alt="Logo Google"
            />
            Continuar con Google
          </button>
          <button
            type="button"
            onClick={() =>
              alert("Inicio con Apple esta disponible proximamente")
            }
            className="flex items-center justify-center gap-2 bg-white w-full py-3 rounded-lg text-black font-semibold border"
          >
            <img
              src="/img/logos/apple.svg"
              alt="Logo apple"
              className="w-5 h-5"
            />
            Continuar con Apple
          </button>
          <p className="text-center text-sm text-gray-700 mt-2">
            ¿No tienes una cuenta?{" "}
            <Link className="font-bold" to="/Register">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
