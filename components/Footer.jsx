"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Дефинираме обекти с име и път за навигацията
  const navItems = [
    { name: "Начало", path: "/" },
    { name: "Меню", path: "/menu" },
    { name: "За нас", path: "/about" },
    { name: "Галерия", path: "/gallery" },
    { name: "Събития", path: "/events" },
    { name: "Контакти", path: "/contact" }, // Оправено на /contact
  ];

  return (
    <footer 
      className="fixed bottom-0 left-0 w-full h-[600px] bg-[#212121] text-[#F5F2ED] -z-10 flex flex-col justify-between py-24 px-12 lg:px-24"
    >
      {/* ЦЕНТРАЛНО СЪДЪРЖАНИЕ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start h-full mt-[-40px]">
        
        {/* ПРАЗНО ПРОСТРАНСТВО ОТЛЯВО */}
        <div className="hidden lg:block lg:col-span-2"></div>

        {/* НАВИГАЦИЯ И КОНТАКТИ */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-20 items-start">
          
          {/* НАВИГАЦИЯ */}
          <div className="space-y-10">
            <h3 className="text-[10px] uppercase tracking-[0.8em] font-bold opacity-30">Навигация</h3>
            <nav className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <Link 
                  key={index}
                  href={item.path}
                  onClick={item.name === "Начало" ? scrollToTop : undefined}
                  className="text-xl font-light uppercase tracking-widest opacity-60 hover:opacity-100 hover:italic hover:translate-x-3 transition-all duration-500 text-left cursor-pointer outline-none block"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* КОНТАКТИ */}
          <div className="space-y-10">
            <h3 className="text-[10px] uppercase tracking-[0.8em] font-bold opacity-30">Контакти</h3>
            <div className="flex flex-col gap-6 italic font-light text-lg">
              <p className="not-italic uppercase tracking-tight opacity-80 text-sm">гр. София, ул. "Артизанска" №12</p>
              <p className="not-italic tracking-tighter opacity-80">+359 888 000 000</p>
              <a href="mailto:reserve@baba.bg" className="text-[#722F37] not-italic font-bold tracking-widest hover:text-white transition-colors">
                RESERVE@BABA.BG
              </a>
            </div>
          </div>
        </div>

        {/* ЛОГО - ПОДРАВНЕНО ПО ГОРНИЯ РЪБ НА КОНТАКТИТЕ */}
        <div className="lg:col-span-4 flex justify-end items-start pt-[2px]">
          <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center translate-y-[20px]">
            <Link 
              href="/"
              onClick={scrollToTop}
              className="relative w-full h-full opacity-25 transition-all duration-700 hover:opacity-50 outline-none cursor-pointer"
            >
              <Image 
                src="/logo.svg" 
                alt="BABA Logo" 
                fill 
                className="object-contain brightness-0 invert" 
              />
            </Link>
          </div>
        </div>
      </div>

      {/* ДОЛНА ЛЕНТА */}
      <div className="w-full space-y-12">
        <div className="w-full h-[1px] bg-white/10"></div> 
        
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pb-4">
          <div className="lg:ml-[16.66%] w-full lg:w-auto">
             <p className="text-[9px] uppercase tracking-[0.4em] opacity-20 text-left">
               © 2025 BABA BALKAN ARTFOOD.
             </p>
          </div>
          
          <div className="lg:w-[33.33%] flex justify-end gap-16 text-[10px] uppercase tracking-[0.5em] lg:pr-4">
            <a href="#" className="opacity-30 text-[#F5F2ED] hover:opacity-100 transition-all duration-300">YouTube</a>
            <a href="#" className="opacity-30 text-[#F5F2ED] hover:opacity-100 transition-all duration-300">Instagram</a>
            <a href="#" className="opacity-30 text-[#F5F2ED] hover:opacity-100 transition-all duration-300">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}