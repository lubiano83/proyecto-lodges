"use client";
import SubTitle from "@/app/components/SubTitle";
import useAuth from "@/app/hooks/useAuth";

export default function Admin() {

    const { quantityRegistered, quantityLogged, user } = useAuth();

    if(!user) return <SubTitle>Primero debes iniciar sesion..</SubTitle>;

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h3>Usuarios Ingresados: {quantityLogged}</h3>
            <h3>Usuarios Registrados: {quantityRegistered}</h3>
        </div>
    )
};