type Props = {
    derechos: string
};

export default function Derechos({ derechos }: Props ) {
    return (
        <div className="flex justify-center items-center gap-1 text-center flex-wrap">
            { derechos }
        </div>
    )
};