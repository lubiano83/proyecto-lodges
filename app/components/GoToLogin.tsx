import Link from "next/link";
import SubTitle from "./SubTitle";
import Boton from "./Boton";

export default function GoToLogin() {
    return (
        <>
            <SubTitle>Primero debes iniciar sesion..</SubTitle>
            <Link href={"/pages/auth/login"}>
                <Boton>Login</Boton>
            </Link>
        </>
    )
};