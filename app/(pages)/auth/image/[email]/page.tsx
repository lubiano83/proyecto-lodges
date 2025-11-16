"use client";
import ChangeImage from "@/app/components/users/profile/ChangeImage";
import { useParams } from "next/navigation";

export default function ImagePage() {
  const { email } = useParams();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6 p-8">
      <ChangeImage email={String(email)} />
    </div>
  );
}
