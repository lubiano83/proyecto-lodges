import Logo from "../Logo";
import Address from "./Address";
import Contact from "./Contact";
import Derechos from "./Derechos";

export default function Footer({
  email,
  address,
  derechos,
  googleMaps,
}: {
  email: string;
  address: string;
  derechos: string;
  googleMaps: string;
}) {
  return (
    <footer className="w-full p-8 flex justify-around items-center flex-wrap-reverse gap-4 bg-(--color1) text-(--color3)">
      <Derechos derechos={derechos} />
      <Address address={address} googleMaps={googleMaps} />
      <Contact email={email} />
      <Logo />
    </footer>
  );
}
