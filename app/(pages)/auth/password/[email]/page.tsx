"use client";
import ChangePassword from "@/app/components/users/profile/ChangePassword";
import { useParams } from "next/navigation"

export default function PasswordPage() {

    const { email } = useParams();

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-6">
            <ChangePassword email={String(email)} />
        </div>
    )
};