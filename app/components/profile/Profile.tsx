"use client";
import Boton from "../Boton";
import SubTitle from "../SubTitle";
import useUser from "@/app/hooks/useUser";

export default function Profile() {

    const { user, logged } = useUser();

    return (
        <div className="flex flex-col justify-center items-center gap-6">
            { logged && user ? 
                <>
                    <div className="flex flex-col justify-center items-start gap-2">
                        <h3><strong>Email:</strong> {user[0].email}</h3>
                        <h3><strong>Nombre:</strong> {user[0].name} {user[0].lastname}</h3>
                        <h3><strong>Telefono:</strong> {user[0].phone}</h3>
                        <h3><strong>Direccion:</strong> {user[0].address}, {user[0].state}, {user[0].country}.</h3>
                        <h3><strong>Actualizado:</strong> {new Date(user[0].updated_at).toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" })}</h3>
                    </div>
                    <div className="flex justify-center items-center">
                        <Boton>Actualizar</Boton>
                    </div>
                </>
            : <SubTitle>Primero debes iniciar sesion..</SubTitle> }
        </div>
    )
};