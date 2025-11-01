type Props = {
    children: string
};

export default function Title({ children }: Props ) {
    return (
        <h2 className="text-center text-3xl text-dark font-semibold underline italic">
            { children }
        </h2>
    )
};