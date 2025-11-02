type Props = {
    children: string
};

export default function SubTitle( { children }: Props ) {
    return (
        <h3 className="text-xl italic">{ children }</h3>
    )
};