import Link from "next/link";

export default function Logo() {
    return (
        <div className="italic font-bold text-2xl hover:text-(--anwa-accent)">
            <Link href={"/"}>
                Anwa Lodge
            </Link>
        </div>
    )
};