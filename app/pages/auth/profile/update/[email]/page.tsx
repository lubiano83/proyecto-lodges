"use client";
import UpdateProfile from "@/app/components/profile/UpdateProfile";
import { useParams } from "next/navigation"

export default function UpdatePage() {

    const { email } = useParams();

    return (
        <div>
            <UpdateProfile email={email} />
        </div>
    )
};