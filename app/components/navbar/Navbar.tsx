"use client";
import Link from "next/link";
import Logo from "../Logo";
import SvgImage from "./SvgImage";
import useDarkMode from "@/app/hooks/useDarkMode";

export default function Navbar() {

    const { toggleDarkMode } = useDarkMode();

    return (
        <header className='bg-(--anwa-surface) w-full p-4 flex justify-around items-center gap-4'>
            <div className="flex gap-2">
                <SvgImage src="/menu-svgrepo-com.svg" size={30} />
                <Logo />
            </div>
            <SvgImage src="/sun-4-svgrepo-com.svg" fnc={toggleDarkMode} size={30} />
            <Link href={"/pages/auth"}>
                <SvgImage src="/profile-circle-svgrepo-com.svg" size={35} />
            </Link>
        </header>
    )
};