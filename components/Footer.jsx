"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  // ------------------------------------------------------------------
  // 🔄 ЛОГИКА ЗА ВРЪЩАНЕ КЪМ НАЧАЛО (Копирана от Navbar)
  // ------------------------------------------------------------------
  const handleLogoClick = (e) => {
    e.preventDefault();

    // Ако вече сме на началната страница и сме най-горе, няма нужда от анимация
    if (pathname === "/" && typeof window !== "undefined" && window.scrollY === 0) {
      return;
    }

    // 1. Пускаме черния екран
    setIsTransitioning(true);

    // 2. Изчакваме анимацията на затъмняване (600ms)
    setTimeout(() => {
      
      if (pathname === "/") {
        // Ако сме на Home, скролваме мигновено до горе (скрито зад черния екран)
        window.scrollTo({ top: 0, behavior: "instant" });
      } else {
        // Ако сме на друга страница, навигираме към Home
        router.push("/");
      }

      // 3. Махаме черния екран малко след действието
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);

    }, 600);
  };

  const navItems = [
    { name: "Начало", path: "/" },
    { name: "Меню", path: "/menu" },
    { name: "За нас", path: "/about" },
    { name: "Галерия", path: "/gallery" },
    { name: "Събития", path: "/events" },
    { name: "Контакти", path: "/contact" },
  ];

  return (
    <>
      {/* --- TRANSITION OVERLAY (Черен екран) --- */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#212121] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <footer 
        className="
          relative lg:fixed bottom-0 left-0 w-full 
          h-auto lg:h-[600px] 
          bg-[#212121] text-[#F5F2ED] 
          z-0 lg:z-[1] 
          flex flex-col justify-between 
          py-12 px-8 lg:py-24 lg:px-24
        "
      >
        {/* ЦЕНТРАЛНО СЪДЪРЖАНИЕ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start h-full lg:mt-[-40px]">
          
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* НАВИГАЦИЯ И КОНТАКТИ */}
          <div className="order-2 lg:order-1 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* НАВИГАЦИЯ */}
            <div className="space-y-4 lg:space-y-6 text-center sm:text-left">
              <h3 className="text-[10px] uppercase tracking-[0.8em] font-bold opacity-30">Навигация</h3>
              <nav className="flex flex-col gap-2 lg:gap-3">
                {navItems.map((item, index) => (
                  <Link 
                    key={index}
                    href={item.path}
                    // Ако е "Начало", използваме специалната анимация, иначе стандартен линк
                    onClick={item.name === "Начало" ? handleLogoClick : undefined}
                    className="text-lg lg:text-xl font-light uppercase tracking-widest opacity-60 hover:opacity-100 hover:italic transition-all duration-500 cursor-pointer outline-none block relative z-10"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* КОНТАКТИ + СОЦИАЛНИ ЗА МОБИЛЕН */}
            <div className="space-y-10 text-center sm:text-left">
              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-[10px] uppercase tracking-[0.8em] font-bold opacity-30">Контакти</h3>
                <div className="flex flex-col gap-2 lg:gap-3 italic font-light text-base lg:text-lg">
                  <p className="not-italic uppercase tracking-tight opacity-80 text-sm">гр. София, ул. "Артизанска" №12</p>
                  <p className="not-italic tracking-tighter opacity-80">+359 888 000 000</p>
                  <a 
                    href="mailto:reserve@baba.bg" 
                    className="text-[#722F37] not-italic font-bold tracking-widest hover:text-white transition-colors duration-300 inline-block relative z-10"
                  >
                    RESERVE@BABA.BG
                  </a>
                </div>
              </div>

              {/* СОЦИАЛНИ ЛИНКОВЕ (МОБИЛЕН) */}
              <div className="flex lg:hidden justify-center gap-6 text-[10px] uppercase tracking-[0.3em] pt-2">
                {["YouTube", "Instagram", "Facebook"].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="opacity-40 hover:opacity-100 transition-opacity duration-300 relative z-10"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ЛОГО - ТУК Е ДОБАВЕНА НОВАТА АНИМАЦИЯ */}
          <div className="order-1 lg:order-2 lg:col-span-4 flex justify-center lg:justify-end items-start pt-[2px]">
            <Link 
              href="/"
              onClick={handleLogoClick}
              className="group relative inline-block outline-none cursor-pointer z-10 lg:translate-y-[10px]"
            >
              <div className="relative w-[180px] h-[80px] lg:w-[300px] lg:h-[150px] transition-opacity duration-700 opacity-25 group-hover:opacity-100">
                <Image 
                  src="/logo-1.svg" 
                  alt="BABA Logo" 
                  fill 
                  className="object-contain brightness-0 invert" 
                />
              </div>
            </Link>
          </div>
        </div>

        {/* ДОЛНА ЛЕНТА */}
        <div className="w-full space-y-6 lg:space-y-12 mt-10 lg:mt-0">
          <div className="w-full h-[1px] bg-white/10"></div> 
          
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pb-8 lg:pb-4">
            <div className="lg:ml-[16.66%] w-full lg:w-auto text-center lg:text-left">
               <p className="text-[9px] uppercase tracking-[0.4em] opacity-20">
                 © 2025 BABA BALKAN ARTFOOD.
               </p>
            </div>
            
            {/* СОЦИАЛНИ ЛИНКОВЕ (ДЕСКТОП) */}
            <div className="hidden lg:flex lg:w-[40%] justify-end gap-16 text-[10px] uppercase tracking-[0.5em] lg:pr-4">
              {["YouTube", "Instagram", "Facebook"].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="opacity-30 hover:opacity-100 transition-opacity duration-500 relative z-10"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}