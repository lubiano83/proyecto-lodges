"use client";
import useAuth from "@/app/hooks/useAuth";
import GoToLogin from "../GoToLogin";

export default function Admin() {

    const { quantityRegistered, quantityLogged, user } = useAuth();

    if(!user) return <GoToLogin />;

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h3>Usuarios Ingresados: {quantityLogged}</h3>
            <h3>Usuarios Registrados: {quantityRegistered}</h3>
        </div>
    )
};