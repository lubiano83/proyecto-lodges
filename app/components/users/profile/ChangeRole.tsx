"use client";
import useAuth from "@/app/hooks/useAuth";
import Boton from "../../Boton";
import GoBack from "../../GoBack";
import Title from "../../Title";

export default function ChangeRole() {

    const { email, setEmail, changeRoleByEmail, role, setRole } = useAuth();

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        await changeRoleByEmail(email);
    };

    return (
        <form
              onSubmit={handleSubmit}
              className="bg-(--color1) text-(--color3) rounded-lg flex flex-col justify-center items-center p-4 gap-4 shadow-sm shadow-gray-700 max-w-lg w-full"
            >
              <Title>Change Role:</Title>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu Email.."
                className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
              />
              <input
                type="text"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ingresa el Role.."
                className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 shadow-sm shadow-gray-700"
              />
              <div className="w-full flex justify-center items-center gap-2">
                <GoBack path="/admin/users" />
                <Boton>Modificar</Boton>
              </div>
            </form>
    )
};