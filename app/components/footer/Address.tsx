import Link from "next/link";

export default function Address({
  address,
  googleMaps,
}: {
  address: string;
  googleMaps: string;
}) {
  return (
    <div className="flex justify-center items-center gap-1 text-center flex-wrap">
      <strong>Dirección:</strong>
      <Link href={googleMaps} target="_blank" className="hover:text-(--color2)">
        {address}
      </Link>
    </div>
  );
}
