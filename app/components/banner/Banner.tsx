"use client";
import { useRouter } from "next/navigation";
import SvgImage from "@/app/components/SvgImage";
import { ReactNode } from "react";

export default function Banner({ children }: { children: ReactNode }) {

    const router = useRouter();

    return (
        <section className="w-full h-10 py-1 px-4 bg-(--color7) flex justify-between items-center gap-4 text-(--color3)">
            <div onClick={() => router.back()}><SvgImage src={"/arrow-sm-left-svgrepo-com-white.svg"} size={33} /></div>
            <div className="w-full flex justify-evenly items-center gap-4">{ children }</div>
            <div onClick={() => router.forward()}><SvgImage src={"/arrow-sm-right-svgrepo-com-white.svg"} size={33} /></div>
        </section>
    )
};