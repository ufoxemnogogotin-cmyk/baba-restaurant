"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Логика: Щом има скрол (дори минимален), приемаме че сме надолу
      setScrolled(window.scrollY > 10); 
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (isOpen || isTransitioning) ? "hidden" : "unset";
  }, [isOpen, isTransitioning]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (pathname === "/" && window.scrollY === 0) {
      setIsOpen(false);
      return;
    }
    setIsOpen(false);
    setIsTransitioning(true);
    setTimeout(() => {
      if (pathname === "/") {
        window.scrollTo(0, 0);
      } else {
        router.push("/");
      }
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 600);
  };

  const menuItems = [
    { name: "Начало", path: "/", img: null },
    { name: "Меню", path: "/menu", img: "/dish2.jpg" },
    { name: "За нас", path: "/about", img: "/loc2.jpg" },
    { name: "Галерия", path: "/gallery", img: "/loc1.jpg" },
    { name: "Събития", path: "/events", img: "/private-event.jpg" },
    { name: "Контакти", path: "/contact", img: null },
  ];

  const smoothEasing = [0.22, 1, 0.36, 1]; 

  const menuVariants = {
    initial: { x: isMobile ? "100%" : "-100%" },
    animate: {
      x: "0%",
      transition: { duration: isMobile ? 1.2 : 1.5, ease: smoothEasing, staggerChildren: 0.1, delayChildren: isMobile ? 0.4 : 0.5 },
    },
    exit: {
      x: isMobile ? "100%" : "-100%",
      transition: { duration: isMobile ? 1.0 : 1.2, ease: smoothEasing },
    },
  };

  const linkVariants = {
    initial: { x: -80, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 1.2, ease: smoothEasing } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.5, ease: "easeIn" } }
  };

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[105] bg-[#212121] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <header>
        {/* --- MOBILE NAV BAR (TOP) --- */}
        {/* Когато scrolled е false (най-горе) -> h-24 (голямо). Когато е true -> h-16 (малко) */}
        <nav 
          className={`lg:hidden fixed top-0 left-0 w-full z-[110] px-4 flex items-center justify-between border-b border-white/5 bg-[#212121] transition-all duration-500 ease-in-out
          ${scrolled ? 'h-16 shadow-lg' : 'h-24'} 
          `}
        >
          <Link 
            href="/" 
            onClick={handleLogoClick} 
            className={`relative transition-all duration-500 ease-in-out active:scale-95 ${scrolled ? 'w-20 h-10' : 'w-28 h-12'}`}
          >
            <Image src="/logo.svg" alt="BABA Logo" fill className="object-contain brightness-0 invert object-left" />
          </Link>
          
          <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col gap-2 p-2 outline-none" aria-label="Menu">
            <div className={`w-8 h-[1.5px] bg-white transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></div>
            <div className={`w-8 h-[1.5px] bg-white transition-all duration-500 ${isOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`}></div>
          </button>
        </nav>

        {/* --- DESKTOP VERTICAL BAR --- */}
        <nav className={`fixed left-0 top-0 h-screen z-[110] border-r border-white/5 bg-[#212121] transition-all duration-700 hidden lg:flex flex-col justify-between items-center py-12 ${scrolled ? 'w-[96px]' : 'w-[120px]'}`}>
          <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col gap-2.5 p-4 group z-[120] outline-none">
            <div className={`w-8 h-[1px] bg-white transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-[11px]' : ''}`}></div>
            <div className={`w-8 h-[1px] bg-white transition-all duration-500 ${isOpen ? '-rotate-45' : ''}`}></div>
          </button>

          <Link href="/" onClick={handleLogoClick} className={`relative transition-all duration-700 cursor-pointer z-[120] ${scrolled ? 'w-20 h-36 scale-105' : 'w-24 h-48 scale-115'}`}>
            <Image src="/logo.svg" alt="BABA Logo" fill className="object-contain brightness-0 invert p-1" />
          </Link>

          <div className="relative w-full flex justify-center h-48 group">
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
              <Link href="/reservation" className="uppercase font-light whitespace-nowrap [writing-mode:vertical-lr] rotate-180 tracking-[0.4em] text-[12px] text-white/50 hover:text-white transition-colors">
                Резервирайте маса
              </Link>
            </div>
            <Link href="/reservation" className={`fixed bottom-10 left-10 bg-[#722F37] text-white px-6 py-5 w-fit transition-all duration-1000 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
              <span className="uppercase font-bold tracking-[0.4em] text-[11px] whitespace-nowrap">Резервирайте маса</span>
            </Link>
          </div>
        </nav>

        {/* --- FULL-SCREEN MENU --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              key="full-menu-container"
              variants={menuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-[100] bg-[#212121] flex flex-col md:flex-row"
            >
              <div className="w-full h-full flex flex-col md:flex-row relative pt-32 md:pt-0 overflow-y-auto">
                <nav className="w-full md:w-2/3 flex flex-col justify-center px-10 md:pl-48 space-y-4 md:space-y-8">
                  {menuItems.map((item, index) => (
                    <motion.div key={index} variants={linkVariants}>
                      <Link 
                        href={item.path}
                        onMouseEnter={() => setHoveredImage(item.img)} 
                        onMouseLeave={() => setHoveredImage(null)}      
                        onClick={(e) => {
                          if (item.path === "/") handleLogoClick(e);
                          else setIsOpen(false);
                        }}
                        className="block text-white text-4xl md:text-7xl font-extralight uppercase tracking-tighter hover:italic hover:pl-4 md:hover:pl-8 transition-all duration-300 opacity-70 hover:opacity-100"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <div className="w-full md:w-1/3 flex flex-col justify-between p-10 md:pb-20 md:pr-20">
                   {/* ... съдържание на менюто ... */}
                   <address className="text-left md:text-right space-y-8 md:space-y-12 not-italic">
                    <div className="space-y-2">
                       <p className="text-white/40 uppercase tracking-widest text-[10px]">Локация</p>
                       <p className="text-white text-lg md:text-xl font-light italic">ул. "Артизанска" №12, София</p>
                    </div>
                  </address>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- MOBILE STICKY BAR (НАЙ-ОТДОЛУ / VERY BOTTOM) --- */}
        <AnimatePresence>
          {scrolled && !isOpen && !isTransitioning && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              // ВАЖНО: fixed + bottom-0 залепва елемента за дъното на viewport-а.
              // pb-[env(safe-area-inset-bottom)] добавя вътрешен падинг само за iPhone чертата,
              // но фонът (bg-[#F5F2ED]) се разпъва до самия физически край на екрана.
              className="lg:hidden fixed bottom-0 left-0 w-full z-[999] bg-[#F5F2ED] border-t border-[#212121]/10 pb-[env(safe-area-inset-bottom)]"
            >
              <div className="grid grid-cols-5 h-16 w-full">
                {/* Телефон */}
                <Link href="tel:+359888000000" className="col-span-1 flex flex-col border-r border-[#212121]/5 bg-white active:bg-gray-100 h-full">
                  <div className="h-full w-full flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="1.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                </Link>
                
                {/* Резервация */}
                <Link href="/reservation" className="col-span-3 flex flex-col bg-white group active:bg-[#212121] transition-colors duration-300 h-full">
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-[#212121] group-active:text-white uppercase tracking-[0.4em] text-[11px] font-bold">BOOK A TABLE</span>
                  </div>
                </Link>
                
                {/* Локация */}
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="col-span-1 flex flex-col bg-white border-l border-[#212121]/5 active:bg-gray-100 h-full">
                  <div className="h-full w-full flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="1.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
