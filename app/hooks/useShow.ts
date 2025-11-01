import { useState } from "react";

export default function useShow() {
    const [ show, setShow ] = useState(false);
    try {
        const handleShow = () => {
            setShow(!show);
        };
        return { show, handleShow };
    } catch (error) {
        throw new Error("Hubo un error al mostrar el componente..");
    }
};