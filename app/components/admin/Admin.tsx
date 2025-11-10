"use client";
import useAuth from "@/app/hooks/useAuth";
import { Role } from "@/app/enum/role.enum";
import NotEnter from "../NotEnter";

export default function Admin() {

    const { quantityRegistered, quantityLogged, user, role } = useAuth();
    
    if(role === Role.user || !user) return <NotEnter />;

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h3>Usuarios Ingresados: {quantityLogged}</h3>
            <h3>Usuarios Registrados: {quantityRegistered}</h3>
        </div>
    )
};