import Link from "next/link";

type Props = {
    address: string,
    googleMaps: string
};

export default function Address({ address, googleMaps }: Props ) {
    return (
        <div className="flex justify-center items-center gap-1 text-center flex-wrap">
            <strong>Dirección:</strong> 
            <Link href={googleMaps} target="_blank" className="hover:text-(--anwa-accent)">
                {address}
            </Link>
        </div>
    )
};