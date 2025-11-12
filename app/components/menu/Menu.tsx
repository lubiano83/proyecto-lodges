"use client";
import Link from "next/link";
import SvgImage from "../navbar/SvgImage";
import useAuth from "@/app/hooks/useAuth";
import { Role } from "@/app/enum/role.enum";

export default function Menu( { handleShow }: { handleShow: () => void} ) {

    const { logoutUser, user, role } = useAuth();

    return (
        <aside className="fixed left-0 top-0 w-64 h-full bg-medium flex flex-col justify-center items-center z-3 bg-(--color1) text-(--color3) text-lg">
            <div className="h-full w-full">
                <div className="flex justify-end items-start p-8">
                    <SvgImage src={"/cross-svgrepo-com-white.svg"} fnc={handleShow} size={30} />
                </div>
                <div className="h-full flex flex-col justify-around items-center pb-40">
                    { user && (role === Role.admin || role === Role.developer) ? <Link href={"/admin"}><h3>Admin</h3></Link> : "" }
                    <Link href={"/"}>Home</Link>
                    { !user ? <Link href={"/auth/login"}><h3>Login</h3></Link> : "" }
                    { !user ? <Link href={"/auth/register"}><h3>Register</h3></Link> : "" }
                    <Link href={"/lodges"}><h3>Lodges</h3></Link>
                    { user ? <h3 onClick={() => logoutUser(user ? user?.email : "")}>Logout</h3> : "" }
                </div>
            </div>
        </aside>
    )
};