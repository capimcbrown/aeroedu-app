import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "@capimcbrown | Formación para el gremio aeronáutico",
  description:
    "Educación digital para pilotos, tripulantes de cabina y despachadores, con pedagogía diseñada para una mejor comprensión.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
