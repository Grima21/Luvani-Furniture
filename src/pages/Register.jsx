import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  //funcion de validacion.
  const validateForm = () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    //comparar ambos password
    if (password !== confirmPassword) {
      setError("Password do no match");
      return false;
    }
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    //validar frontend
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const { data, error: supabaseError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (supabaseError) {
        setError(supabaseError.message);
        return;
      }
      //Exito al registrar
      console.log("Registration succesful", data);
      setSuccessMessage(
        "Account created successfully! Check your email for verification.",
      );

      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    } catch (err) {
      setError("An error occured during registration. Please try again.");
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
          redirectTo: `${window.location.origin}/Home`,
        },
      });
      if (oAuthError) throw oAuthError;
    } catch (err) {
      setError("No se pudo iniciar sesion con Google.");
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
            Crea tu cuenta
          </h2>
          <p className="text-sm text-gray-500">
            Registrate con tu correo o continua con un proveedor{" "}
          </p>
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
        </div>
        <div className="flex items-center gap-2 w-full">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="text-sm text-gray-500">o</span>
          <div className="h-px flex-1 bg-gray-300"></div>
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

          <label className="text-black text-lg font-semibold" id="password">
            Confirmar contraseña
          </label>
          <input
            className="w-full h-10 rounded-lg px-4"
            type="password"
            id="password"
            placeholder="*****"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-black/80 rounded-lg text-white py-2 mt-4"
          >
            Iniciar session
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mt-4">{successMessage}</p>
          )}
        </form>
        <p className="text-center text-sm text-gray-700 mt-2">
          ¿Ya tienes una cuenta?{" "}
          <Link className="font-bold" to="/Login">
            Inicia sesión
          </Link>
        </p>
      </div>
    </section>
  );
}
