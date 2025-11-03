type Props = {
    children: string
};

export default function SubTitle( { children }: Props ) {
    return (
        <h3 className="text-xl italic text-center">{ children }</h3>
    )
};