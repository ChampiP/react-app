import { useEffect } from "react";
import { addUser } from "./services/userService";

function App() {
  useEffect(() => {
    addUser({ name: "Prueba automática" });
  }, []);

  return <h1>Revisa tu db.json</h1>;
}

export default App;
