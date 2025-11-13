"use client";
import Link from "next/link";
import Boton from "../../Boton";
import useAuth from "@/app/hooks/useAuth";
import Title from "../../Title";

export default function ChangeImage({ email }: {email: string}) {

    const { changeImageByEmail, image, setImage } = useAuth();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      await changeImageByEmail(email);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-(--color1) text-(--color3) rounded-lg flex flex-col justify-center items-center p-4 gap-4 shadow-sm shadow-gray-700 max-w-lg w-full">
            <Title>Change Image:</Title>
            <input type="file" name="image" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} className="bg-(--color3) rounded-lg h-8 w-full min-w-72 text-(--color4) px-2 py-1 shadow-sm shadow-gray-700 flex justify-center items-center" />
            <div className="w-full flex justify-center items-center gap-2">
                <Link href={"/auth/profile"}>
                    <Boton>Volver</Boton>
                </Link>
                <Boton>Modificar</Boton>
            </div>
        </form>
    )
};