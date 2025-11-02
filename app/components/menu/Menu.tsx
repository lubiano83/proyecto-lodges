import SvgImage from "../navbar/SvgImage";

type Props = {
    handleShow: () => void
};

export default function Menu( { handleShow }: Props ) {
    return (
        <aside className="fixed left-0 top-0 w-64 h-full bg-medium flex flex-col justify-center items-center font-bold z-3 bg-(--color1) text-(--color3)">
            <div className="h-full w-full">
                <div className="w-full flex justify-end items-start p-8" onClick={handleShow}>
                    <SvgImage src={"/cross-svgrepo-com-white.svg"} fnc={handleShow} size={30} />
                </div>
                <div className="h-full flex flex-col justify-around items-center pb-40">
                    <h3>Admin</h3>
                    <h3>Login</h3>
                    <h3>Register</h3>
                    <h3>Lodges</h3>
                    <h3>Logout</h3>
                </div>
            </div>
        </aside>
    )
};