import Link from "next/link";

type Props = {
    email: string
};

export default function Contact({ email }: Props ) {
    return (
        <div className="flex justify-center item-center gap-1 text-center flex-wrap">
            <strong>Contacto:</strong> 
            <Link href={`mailto:${email}`} className="hover:text-(--color2)">
                {email}
            </Link>
        </div>
    )
};