// src/App.jsx (CÓDIGO CORREGIDO Y COMPLETO)

import Home from "./pages/Home";
import NewPage from "./pages/NewPage"; // Asegúrate de que existe
import FurniturePage from "./pages/FunirturePage"; // Asegúrate de que existe
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom"; // IMPORTANTE: Importar Routes y Route

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* 💡 ESTA RUTA DEBE COINCIDIR CON LA URL DEL NAVEGADOR CUANDO FALLA EL MENU */}
        <Route path="/new-furniture" element={<NewPage />} />

        {/* Y esta ruta debe coincidir con la URL del menú MegaMenuPanel.jsx */}
        <Route path="/category/new-furniture" element={<NewPage />} />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
