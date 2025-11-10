import Link from "next/link";
import SubTitle from "./SubTitle";
import Boton from "./Boton";

export default function NotEnter() {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <SubTitle>No tienes permisos..</SubTitle>
            <Link href={"/"}>
                <Boton>Home</Boton>
            </Link>
        </div>
    )
};