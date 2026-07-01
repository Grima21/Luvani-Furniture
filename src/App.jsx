import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewPage from "./pages/NewPage";
import FurniturePage from "./pages/FunirturePage";
import Checkout from "./components/Checkout";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import { InventarioPage } from "./pages/InventarioPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    // 1. El Provider abraza a TODAS las rutas para que la data no se pierda en ningún lado
    <CartProvider>
      <Routes>
        {/* Páginas limpias (SIN Navbar ni Footer públicos) */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Checkout" element={<Checkout />} />

        {/* Páginas comerciales (Aquí adentro es donde debes meter tu <Navbar /> y <Footer />) */}
        <Route path="/" element={<AdminPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new/furniture" element={<NewPage />} />
        <Route path="/category/new-furniture" element={<NewPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/inventario" element={<InventarioPage />} />

        <Route
          path="*"
          element={<div className="p-8 text-center text-xl">404 Not Found</div>}
        />
      </Routes>
    </CartProvider>
  );
}

export default App;
