import Link from "next/link";
import Boton from "./Boton";

export default function GoBack({ path }: { path: string }) {
  return (
    <Link href={path}>
      <Boton>Volver</Boton>
    </Link>
  );
}
