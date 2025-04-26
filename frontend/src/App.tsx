import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/register">Registro</Link>
          <Link to="/login">Login</Link>
          <Link to="/users">Usuarios</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* PROTEGIDAS */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <footer>&copy; {new Date().getFullYear()} Mi App Full-Stack</footer>
      </div>
    </BrowserRouter>
  );
}
