import { useState } from "react";
import { addUser } from "../services/userService";

interface UserFormProps {
  onUserAdded: () => void;
}

const UserForm = ({ onUserAdded }: UserFormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addUser({ name });
    setName("");
    onUserAdded(); // Refresca la lista
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        required
      />
      <button type="submit">Agregar Usuario</button>
    </form>
  );
};

export default UserForm;
