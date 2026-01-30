import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata = {
  title: "ZAYRX — Booking + CRM",
  description: "Barbershoplar uchun bron va CRM tizimi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
