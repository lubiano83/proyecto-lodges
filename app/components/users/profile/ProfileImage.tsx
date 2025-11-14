import Image from "next/image";

export default function ProfileImage({ image }: { image: string }) {
  return (
    <Image
      src={image}
      alt="user image"
      width={80}
      height={80}
      className="w-full h-full rounded-full object-cover border-2 border-(--color3) shadow-sm shadow-gray-700"
    />
  );
}
