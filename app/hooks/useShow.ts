import { useState } from "react";

export default function useShow() {
    const [ show, setShow ] = useState(false);
    try {
        const handleShow = () => {
            setShow(!show);
        };
        return { show, handleShow };
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
        throw new Error("Hubo un error en el backend..");
    }
};