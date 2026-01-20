"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function EventsSection() {
  const sectionRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Следим скрола само ако секцията е близо до вюпорта
      if (rect.top < window.innerHeight && rect.bottom > -500) {
        setOffsetY(rect.top);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative z-50 bg-[#F5F2ED] pt-12 pb-24 lg:py-48 overflow-hidden">

      
      {/* ПАРАЛАКС ТЕКСТ - Скрит на мобилни (hidden), за да не пречи на четимостта */}
      <div 
        className="hidden lg:block absolute left-[15px] bottom-[-5%] text-[15vw] font-serif italic text-[#636B2F]/[0.05] pointer-events-none select-none z-10 transition-transform duration-75 ease-out"
        style={{ 
          transform: `translate(${Math.abs(offsetY) * 0.2}px, ${offsetY * 0.4}px) rotate(-8deg)` 
        }}
      >
        Exclusive
      </div>

      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32 lg:ml-[12%] relative z-20 text-center lg:text-left">
          
          {/* MEDIA SIDE - Видима само на десктоп */}
          <div className="hidden lg:block lg:w-[42%] relative h-[70vh] group">
            <div className="absolute -inset-4 border border-[#212121]/5 scale-95 transition-transform duration-1000 group-hover:scale-100"></div>
            <div className="relative w-full h-full overflow-hidden shadow-sm">
              <Image 
                src="/private-event.jpg" 
                alt="Лично събитие в BABA"
                fill
                className="object-cover transition-transform duration-[3000ms] group-hover:scale-105"
              />
            </div>
          </div>

          {/* TEXT SIDE */}
          <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start">
            <h2 className="text-[#212121] uppercase tracking-[0.5em] lg:tracking-[0.8em] text-[10px] font-bold mb-6 lg:mb-8 opacity-40">
              Събития
            </h2>
            
            <h3 className="text-[#212121] text-3xl md:text-4xl lg:text-[3.5vw] font-serif italic leading-[1.2] mb-8 lg:mb-12 uppercase tracking-tight">
              Вашето лично събитие <br className="hidden lg:block" /> 
              <span className="text-[#722F37]">в сърцето на София</span>
            </h3>
            
            <div className="space-y-6 lg:space-y-8 mb-10 lg:mb-16 max-w-lg">
              <p className="text-[#212121]/70 text-[16px] lg:text-[17px] leading-relaxed italic border-l-0 lg:border-l-2 border-[#722F37]/20 lg:pl-8">
                В неделите <span className="text-[#722F37] font-bold mx-1 lg:mx-2 text-[18px] lg:text-[19px] not-italic tracking-wider">BABA</span> <br className="lg:hidden" /> затваря врати за широката публика.
              </p>
            </div>

            {/* БУТОН - ОБНОВЕН СТИЛ ЗА ТЕЛЕФОН */}
            <button className="group relative w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 border-2 border-[#722F37]/40 overflow-hidden transition-all duration-700 hover:border-[#722F37] outline-none rounded-none mt-4 md:mt-8">

              <span className="relative z-10 text-[#212121] text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.4em] lg:tracking-[0.5em] transition-colors duration-500 group-hover:text-white leading-tight">
                НАПРАВИ ЗАПИТВАНЕ
              </span>
              <div className="absolute top-0 left-0 w-full h-full bg-[#722F37] translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0"></div>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
