import Link from "next/link";
import SubTitle from "./SubTitle";
import Boton from "./Boton";

export default function GoToLogin() {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <SubTitle>Primero debes iniciar sesion..</SubTitle>
            <Link href={"/pages/auth/login"}>
                <Boton>Login</Boton>
            </Link>
        </div>
    )
};