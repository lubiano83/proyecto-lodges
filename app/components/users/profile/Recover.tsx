"use client";
import Boton from "../../Boton";
import GoBack from "../../GoBack";
import Title from "../../Title";
import useAuth from "@/app/hooks/useAuth";

export default function Recover() {
  const { email, setEmail, recoverPasswordByEmail } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await recoverPasswordByEmail();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-(--color1) text-(--color3) rounded-lg flex flex-col justify-center items-center p-4 gap-4 shadow-sm shadow-gray-700 max-w-lg w-full"
    >
      <Title>Recover Password:</Title>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ingresa tu Email.."
        className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
      />
      <div className="w-full flex justify-center items-center gap-2">
        <GoBack path="/login" />
        <Boton>Enviar</Boton>
      </div>
    </form>
  );
}
