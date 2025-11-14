"use client";
import Link from "next/link";
import Boton from "../Boton";
import useAuth from "@/app/hooks/useAuth";
import Title from "../Title";

export default function RegisterForm() {
  const {
    registerUser,
    email,
    setEmail,
    name,
    setName,
    lastname,
    setLastname,
    phone,
    setPhone,
    country,
    setCountry,
    state,
    setState,
    address,
    setAddress,
    password,
    setPassword,
  } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await registerUser();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-(--color1) text-(--color3) rounded-lg flex flex-col justify-center items-center p-4 gap-4 shadow-sm shadow-gray-700 max-w-lg w-full"
    >
      <Title>Register:</Title>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ingresa tu email.."
        className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
      />
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ingresa tu nombre.."
        className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
      />
      <input
        type="text"
        name="lastname"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        placeholder="Ingresa tu apellido.."
        className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
      />
      <input
        type="text"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Ingresa tu telefono.."
        className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
      />
      <input
        type="text"
        name="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Ingresa tu pais.."
        className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
      />
      <input
        type="text"
        name="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="Ingresa tu ciudad.."
        className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
      />
      <input
        type="text"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Ingresa tu direccion.."
        className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Ingresa tu password.."
        className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
      />
      <div className="w-full flex justify-center items-center gap-2">
        <Link href={"/login"}>
          <Boton>Login</Boton>
        </Link>
        <Boton>Registrar</Boton>
      </div>
    </form>
  );
}
