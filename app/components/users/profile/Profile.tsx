"use client";
import Link from "next/link";
import Boton from "@/app/components/Boton";
import useAuth from "@/app/hooks/useAuth";
import Title from "@/app/components/Title";
import Image from "next/image";
import GoToLogin from "../../GoToLogin";

export default function Profile() {

    const { user } = useAuth();

    if(!user) return <GoToLogin />;

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <Title>Profile:</Title>
            <div className="flex flex-col justify-center items-start gap-4">
                <Link href={`/auth/image/${user.email}`} className="group aspect-square w-full h-auto relative cursor-pointer bg-(--color1) rounded-lg overflow-hidden">
                    <Image src={user && user.image ? user.image : "/user-circle-svgrepo-com-white.svg"} alt="imagen usuario" fill priority className="object-cover" />
                    <span className="absolute inset-0 flex justify-center items-center text-gray-700 font-bold text-lg opacity-0 group-hover:opacity-80 bg-(--color2) bg-opacity-50 transition-opacity duration-300">Cambiar Imagen</span>
                </Link>
                <div className="flex flex-col justify-center items-start gap-2 text-lg">
                    <h3><strong>Email:</strong> {user.email}</h3>
                    <h3><strong>Nombre:</strong> {user.name} {user.lastname}</h3>
                    <h3><strong>Telefono:</strong> {user.phone}</h3>
                    <h3><strong>Direccion:</strong> {user.address}, {user.state}, {user.country}.</h3>
                    <h3><strong>Actualizado:</strong> {new Date(user.updated_at).toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" })}</h3>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <Link href={`/auth/update/${user.email}`}>
                    <Boton>Actualizar</Boton>
                </Link>
            </div>
        </div>
    )
};