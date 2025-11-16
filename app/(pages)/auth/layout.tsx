import Banner from "@/app/components/banner/Banner";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Banner>{""}</Banner>
            { children }
        </>
    )
};