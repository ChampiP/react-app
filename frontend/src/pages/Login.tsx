import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type Form = z.infer<typeof schema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = async (data: Form) => {
    const res = await api.post("/usuarios/login", data);
    localStorage.setItem("token", res.data.token);
    navigate("/users");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input
        type="password"
        {...register("password")}
        placeholder="Contraseña"
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
