"use client";
import Banner from "@/app/components/banner/Banner";
import { ReactNode } from "react";
import useAuth from "@/app/hooks/useAuth";
import Contador from "@/app/components/admin/users/Contador";

export default function AdminLayout({ children }: { children: ReactNode }) {

    const { quantityRegistered, quantityLogged } = useAuth();

    return (
        <>
            <Banner>
                <Contador quantityRegistered={quantityRegistered} quantityLogged={quantityLogged} />
            </Banner>
            { children }
        </>
    )
};