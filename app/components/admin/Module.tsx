import Link from "next/link";
import { ReactNode } from "react";
import useCapitalize from "@/app/hooks/useCapitalize";

export default function Module({ children }: { children: ReactNode }) {

    const { capitalize }: any = useCapitalize();

    return (
        <Link href={`/admin/${children}`} className="h-25 w-50 bg-(--color1) text-(--color3) flex justify-center items-center rounded-xl shadow-sm shadow-gray-700 border-4 border-(--color3) hover:bg-(--color7)">
            <h3 className="text-2xl font-bold">{ capitalize(children) }</h3>
        </Link>
    )
};