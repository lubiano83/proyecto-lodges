"use client";
import Link from "next/link";
import Boton from "../Boton";
import useAuth from "@/app/hooks/useAuth";
import Title from "../Title";

export default function LoginForm() {

  const { loginUser, email, setEmail, password, setPassword } = useAuth();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      await loginUser();
    };

  return (
    <form onSubmit={handleSubmit} className="bg-(--color1) text-(--color3) rounded-lg flex flex-col justify-center items-center p-4 gap-4 shadow-sm shadow-gray-700 max-w-lg w-full">
        <Title>Login:</Title>
        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa tu email.." className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700" />
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa tu password.." className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700" />
        <div className="w-full flex justify-center items-center gap-2">
          <Link href={"/register"}>
            <Boton>Registrar</Boton>
          </Link>
          <Boton>Ingresar</Boton>
        </div>
        <Link href={"/recover"}>
          <h5 className="text-sm text-(--color3)">Recuperar contraseña..</h5>
        </Link>
    </form>
  );
}
