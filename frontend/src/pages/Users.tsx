import { useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: number;
  nombre: string;
  email: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api
      .get("/usuarios")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Lista de Usuarios
      </h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            style={{ padding: "0.5rem", borderBottom: "1px solid #ccc" }}
          >
            <strong>{user.nombre}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
