import { ReactNode } from "react";

export default function Module({ children }: { children: ReactNode }) {
    return (
        <div className="h-25 w-50 bg-(--color1) text-(--color3) flex justify-center items-center rounded-xl shadow-sm shadow-gray-700 border-4 border-(--color3)">
            <h3 className="text-2xl font-bold">{ children }</h3>
        </div>
    )
};