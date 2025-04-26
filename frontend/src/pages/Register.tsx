import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  nombre: z.string().min(1, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type Form = z.infer<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = async (data: Form) => {
    await api.post("/usuarios/register", data);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Registro</h2>
      <input {...register("nombre")} placeholder="Nombre" />
      {errors.nombre && <p className="error">{errors.nombre.message}</p>}

      <input {...register("email")} placeholder="Email" />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input
        type="password"
        {...register("password")}
        placeholder="Contraseña"
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit">Registrarse</button>
    </form>
  );
}
