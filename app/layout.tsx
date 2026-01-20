import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "BABA - Balkan Artfood",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="bg">
      {/* Добавихме suppressHydrationWarning={true} тук.
         Това ще спре грешката от разширението (vc-init), 
         без да чупи нищо по сайта.
      */}
      <body 
        className="bg-[#212121] min-h-screen flex flex-col"
        suppressHydrationWarning={true}
      >
        <Navbar />

        {/* КЛЮЧОВАТА ПРОМЯНА:
            1. mb-0 -> премахва черната дупка на телефон.
            2. lg:mb-[600px] -> връща мястото за футера само на десктоп.
            3. flex-grow -> разпъва съдържанието, ако е твърде малко.
        */}
        <main className="relative z-5 bg-[#F5F2ED] mb-0 lg:mb-[600px] shadow-[0_50px_100px_rgba(0,0,0,0.3)] min-h-screen flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
