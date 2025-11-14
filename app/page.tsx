import { FB_Carousel } from "./components/home/FB-Carousel";
import Boton from "./components/Boton";
import Title from "./components/Title";
import SubTitle from "./components/SubTitle";
import Texto from "./components/home/Texto";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col justify-between items-center gap-1">
        <Title>¡Bienvenidos a Anwa Lodge!</Title>
        <SubTitle>Donde la montaña se encuentra con la calma...</SubTitle>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 p-1">
        <FB_Carousel />
        <Texto />
      </div>
      <Link href={"/lodges"}>
        <Boton>Reservar</Boton>
      </Link>
    </div>
  );
}
