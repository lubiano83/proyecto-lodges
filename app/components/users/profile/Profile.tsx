"use client";
import Link from "next/link";
import Boton from "@/app/components/Boton";
import SubTitle from "@/app/components/SubTitle";
import useAuth from "@/app/hooks/useAuth";
import Title from "@/app/components/Title";

export default function Profile() {

    const { user } = useAuth();

    if(!user) return <SubTitle>Primero debes iniciar sesion..</SubTitle>;

    return (
        <div className="flex flex-col justify-center items-center gap-6">
            <Title>Profile:</Title>
            <div className="flex flex-col justify-center items-start gap-2">
                <h3><strong>Email:</strong> {user.email}</h3>
                <h3><strong>Nombre:</strong> {user.name} {user.lastname}</h3>
                <h3><strong>Telefono:</strong> {user.phone}</h3>
                <h3><strong>Direccion:</strong> {user.address}, {user.state}, {user.country}.</h3>
                <h3><strong>Actualizado:</strong> {new Date(user.updated_at).toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" })}</h3>
            </div>
            <div className="flex justify-center items-center">
                <Link href={`/pages/auth/profile/update/${user.email}`}>
                    <Boton>Actualizar</Boton>
                </Link>
            </div>
        </div>
    )
};