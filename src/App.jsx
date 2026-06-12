import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewPage from "./pages/NewPage";
import FurniturePage from "./pages/FunirturePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new/furniture" element={<NewPage />} />
        <Route path="/category/new-furniture" element={<NewPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route
          path="*"
          element={<div className="p-8 text-center text-xl">404 Not Found</div>}
        />
      </Routes>
    </>
  );
}

export default App;
