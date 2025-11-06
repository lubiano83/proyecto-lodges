type Props = {
    children: any
};

export default function Boton( { children }: Props ) {
    return (
        <button className="min-w-24 bg-(--color6) hover:bg-(--color5) text-(--color3) py-2 px-4 rounded-xl border-3 border-(--color3) shadow-sm hover:cursor-pointer shadow-gray-700 text-lg">{children}</button>
    )
};