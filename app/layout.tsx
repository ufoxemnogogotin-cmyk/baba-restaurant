import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "BABA - Balkan Artfood",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <body className="bg-[#212121]"> {/* Фуутърът ще се вижда отдолу */}
        <Navbar />
        
        {/* Основно съдържание: повдигнато над фуутъра със сянка */}
        <main className="relative z-10 bg-[#F5F2ED] mb-[600px] shadow-[0_50px_100px_rgba(0,0,0,0.3)] min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}