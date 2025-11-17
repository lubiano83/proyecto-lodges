import type { Metadata } from "next";
import "./globals.css";
import Inicio from "./components/Inicio";
import { AuthProvider } from "./context/auth.context";
import { HomeProvider } from "./context/home.context";

export const metadata: Metadata = {
  title: "Anwa Lodge",
  description: "Un lugar donde puedes encontrar la calma..",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const title = String(process.env.TITLE);
  const email = String(process.env.MAIL_USER);
  const address = String(process.env.ADDRESS);
  const year = new Date().getFullYear();
  const derechos = `© ${year} Todos los derechos reservados`;
  const googleMaps = String(process.env.GOOGLEMAPS);

  return (
    <html lang="es">
      <AuthProvider>
        <HomeProvider>
          <body className="min-h-screen grid grid-rows-[auto_1fr_auto] font-serif bg-(--color3) text-(--color4)">
            <Inicio
              title={title}
              email={email}
              address={address}
              derechos={derechos}
              googleMaps={googleMaps}
            >
              {children}
            </Inicio>
          </body>
        </HomeProvider>
      </AuthProvider>
    </html>
  );
}
