"use client";
import Link from "next/link";
import Logo from "../Logo";
import SvgImage from "./SvgImage";
import UserInterface from "@/app/interface/user.interface";

export default function Navbar( { toggleDarkMode, handleShow, isDarkMode, user }: { toggleDarkMode: () => void, handleShow: () => void, isDarkMode: boolean, user: UserInterface } ) {

    return (
        <header className='bg-(--color1) text-(--color3) w-full p-4 flex justify-around items-center gap-4'>
            <div className="flex gap-2">
                <SvgImage src={"/menu-svgrepo-com-white.svg"} size={30} fnc={handleShow} />
                <Logo />
            </div>

            { isDarkMode ? <SvgImage src="/moon-svgrepo-com-white.svg" fnc={toggleDarkMode} size={33} /> :  <SvgImage src="/sun-4-svgrepo-com-white.svg" fnc={toggleDarkMode} size={33} /> }
            <Link href={"/pages/auth/profile"}>
                <SvgImage src={user && user.image ? user.image : "/user-circle-svgrepo-com-white.svg"} size={35} />
            </Link>
        </header>
    )
};