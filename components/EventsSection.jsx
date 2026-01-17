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
      if (rect.top < window.innerHeight && rect.bottom > -500) {
        setOffsetY(rect.top);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative z-50 bg-[#F5F2ED] py-32 lg:py-48 overflow-hidden">
      
      {/* ПАРАЛАКС ТЕКСТ */}
      <div 
        className="absolute left-[15px] bottom-[-5%] text-[15vw] font-serif italic text-[#636B2F]/[0.05] pointer-events-none select-none z-10 transition-transform duration-75 ease-out"
        style={{ 
          transform: `translate(${Math.abs(offsetY) * 0.4}px, ${offsetY * 0.6}px) rotate(-8deg)` 
        }}
      >
        Exclusive
      </div>

      <div className="container mx-auto px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32 lg:ml-[12%] relative z-20">
          
          {/* MEDIA SIDE С РАМКА */}
          <div className="w-full lg:w-[42%] relative h-[70vh] group">
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
          <div className="w-full lg:w-[50%] flex flex-col items-start">
            <h2 className="text-[#212121] uppercase tracking-[0.8em] text-[10px] font-bold mb-8 opacity-40">Събития</h2>
            
            <h3 className="text-[#212121] text-4xl lg:text-[3.5vw] font-serif italic leading-[1.2] mb-12 uppercase tracking-tight">
              Вашето лично събитие <br /> <span className="text-[#722F37]">в сърцето на София</span>
            </h3>
            
            <div className="space-y-8 mb-16 max-w-lg">
              <p className="text-[#212121]/70 text-[17px] leading-relaxed italic border-l-2 border-[#722F37]/20 pl-8">
                В неделите <span className="text-[#722F37] font-bold mx-2 text-[19px] not-italic tracking-wider">BABA</span> затваря врати за широката публика.
              </p>
            </div>

            {/* БУТОН С ЧИСТ +2PX BORDER И БЕЗ БЪГОВЕ */}
            <button className="group relative px-16 py-6 border-2 border-[#722F37]/40 overflow-hidden transition-all duration-700 hover:border-[#722F37] outline-none rounded-none">
              <span className="relative z-10 text-[#212121] text-[11px] font-bold uppercase tracking-[0.5em] transition-colors duration-500 group-hover:text-white">
                Запитване за частен прием
              </span>
              {/* Фонът е фиксиран да запълва точно контейнера, без да излиза извън него */}
              <div className="absolute top-0 left-0 w-full h-full bg-[#722F37] translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}