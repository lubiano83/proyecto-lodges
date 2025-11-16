import InfoInterface from "./Info.interface";

export default interface HomeInterface {

    title: string;
    setTitle: (title: string) => void;
    subtitle: string;
    setSubtitle: (subtitle: string) => void;
    texto: string;
    setTexto: (texto: string) => void;
    image: string;
    setImage: (image: string) => void;
    getInfo: () => void;
    info: InfoInterface | null;
    getImages: () => void;
    images: string[] | null;
    setImages: (images: string[] | null) => void;

};