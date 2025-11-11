"use client";
import UpdateProfile from "@/app/components/users/profile/UpdateProfile";
import { useParams } from "next/navigation"

export default function UpdatePage() {

    const { email } = useParams();
    const emailString = `${email}`;

    return (
        <div className="w-full h-full flex justify-center items-center">
            <UpdateProfile email={emailString} />
        </div>
    )
};