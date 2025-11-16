"use client";
import useHome from "@/app/hooks/useHome"

export default function AdminHomePage() {

    const { title, setTitle, subtitle, setSubtitle, texto, setTexto, image, setImage } = useHome();

    return (
        <>
            Admin Home
        </>
    )
};