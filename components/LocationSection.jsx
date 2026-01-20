"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const locations = [
  { id: 1, title: "ТЕРАСАТА", desc: "Емблематична панорамна тераса, разположена на самия покрив на Народния театър.", img: "/loc1.jpg" },
  { id: 2, title: "ПОКРИВА", desc: "Усетете ритъма на София от птичи поглед, където историческата архитектура се среща с модерния дух на града.", img: "/loc2.jpg" },
  { id: 3, title: "БАРА", desc: "Нашият каменен бар съчетава суровата красота на естествените материали с изтънчена селекция от авторски коктейли.", img: "/loc3.jpg" },
  { id: 4, title: "ДЕТАЙЛ", desc: "Интериорът е проектиран да разказва истории чрез всеки детайл – от ръчно обработените повърхности до художественото осветление.", img: "/loc4.jpg" },
  { id: 5, title: "360 ГЛЕДКА", desc: "Потопете се напълно в нашата атмосфера чрез иновативното 360-градусово виртуално изживяване, което ще ви пренесе в нашия свят.", img: "/logo.svg" },
];

export default function LocationSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredNavIndex, setHoveredNavIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollable = containerRef.current.offsetHeight - windowHeight;
      const currentScroll = -rect.top;
      
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIndex = Math.min(Math.floor(scrollProgress * locations.length), locations.length - 1);
  const logoCircleProgress = scrollProgress > 0.8 ? (scrollProgress - 0.8) / 0.18 : 0;

  const scrollToIndex = (index) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const windowHeight = window.innerHeight;
    const totalHeight = container.offsetHeight;
    
    const targetPos = container.offsetTop + (index * (totalHeight - windowHeight) / (locations.length - 0.5));

    window.scrollTo({
      top: targetPos,
      behavior: "smooth"
    });
  };

  return (
    <section ref={containerRef} className="relative z-40 bg-[#F5F2ED] h-[800vh]">
      
      {/* BACKGROUND TEXT */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <h2 
          className="text-[28vw] font-serif italic text-[#BAC095]/10 whitespace-nowrap"
          style={{ transform: `translateX(${(0.5 - scrollProgress) * 30}%)` }}
        >
          LOCATION
        </h2>
      </div>

      {/* MAIN CONTENT LAYER */}
      <div className="sticky top-0 h-screen w-full flex items-center z-10 mt-[-100vh]">
        
        {/* DESKTOP INDICATOR */}
        <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 flex-col items-end gap-8 z-50">
            {locations.map((loc, i) => (
              <button 
                key={i} 
                onClick={() => scrollToIndex(i)}
                onMouseEnter={() => setHoveredNavIndex(i)}
                onMouseLeave={() => setHoveredNavIndex(null)}
                className="group flex flex-row-reverse items-center justify-end gap-4 outline-none"
              >
                <div className={`transition-all duration-700 h-[2px] shrink-0 ${activeIndex === i ? 'w-12 bg-[#722F37]' : 'w-4 bg-[#212121]/20 group-hover:w-8 group-hover:bg-[#722F37]/40'}`}></div>
                <span className={`text-[9px] uppercase font-bold tracking-[0.3em] transition-all duration-500 whitespace-nowrap ${activeIndex === i || hoveredNavIndex === i ? 'opacity-100 text-[#722F37] -translate-x-2' : 'opacity-0 translate-x-4'}`}>
                  {loc.title}
                </span>
              </button>
            ))}
        </div>

        <div className="container lg:w-full lg:max-w-none mx-auto px-6 md:px-12 lg:px-0 lg:pl-[320px] lg:pr-30 w-full relative h-full flex flex-col items-center justify-center">
          
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4 lg:gap-24">
            
            {/* МОБИЛЕН ЕТИКЕТ "ПРЕЖИВЯВАНЕТО" */}
            <h2 className="lg:hidden text-[#212121] uppercase tracking-[0.5em] text-[10px] font-bold mb-2 opacity-40 order-1">
              Преживяването
            </h2>

            {/* MEDIA SIDE */}
            <div className="w-full lg:w-[65%] relative h-[35vh] md:h-[45vh] lg:h-[70vh] bg-[#e5e2dd] overflow-hidden shadow-2xl order-2 lg:order-2 lg:mr-[100px]">
              {locations.map((loc, index) => (
                <div key={loc.id} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${activeIndex === index ? 'translate-y-0 opacity-100' : (index < activeIndex ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0')}`} style={{ zIndex: activeIndex === index ? 20 : 10 }}>
                  <div className="relative w-full h-full">
                    {index === 4 ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#F5F2ED] scale-110">
                        <div className="relative w-24 h-24 lg:w-64 lg:h-64 z-10">
                          <Image src="/logo.svg" alt="Logo" fill className="object-contain brightness-0 opacity-25" />
                        </div>
                        <svg className="absolute w-[220px] h-[220px] lg:w-[500px] lg:h-[500px] -rotate-90 z-20">
                          <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#722F37" strokeWidth="1" strokeDasharray="1445" strokeDashoffset={1445 - (1445 * Math.min(logoCircleProgress, 1))} className="transition-all duration-150 ease-linear" />
                        </svg>
                      </div>
                    ) : (
                      <Image src={loc.img} alt={loc.title} fill className="object-cover" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* МОБИЛНИ ИНДИКАТОРИ */}
            <div className="flex lg:hidden gap-3 mt-2 z-50 order-3">
              {locations.map((_, i) => (
                <button key={i} onClick={() => scrollToIndex(i)} className="outline-none">
                  <div className={`transition-all duration-700 h-[2px] shrink-0 ${activeIndex === i ? 'w-8 bg-[#722F37]' : 'w-3 bg-[#212121]/20'}`}></div>
                </button>
              ))}
            </div>

            {/* TEXT SIDE - ДОБАВЕН MT-8 ЗА МОБИЛНИ (ОКОЛО +30px ОБЩО) */}
            <div className="w-full lg:w-[35%] z-20 text-center lg:text-left order-4 lg:order-1 mt-8 lg:mt-0 pt-0 lg:pt-0">
              <h2 className="hidden lg:block text-[#212121] uppercase tracking-[0.8em] text-[10px] font-bold mb-12 opacity-40">
                Преживяването
              </h2>
              
              <div className="relative h-[230px] md:h-[250px] lg:h-[350px]">
                {locations.map((loc, i) => (
                  <div key={i} className={`absolute top-0 left-0 w-full transition-all duration-700 ${activeIndex === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                    <h3 className="text-[#212121] text-3xl md:text-5xl lg:text-[5vw] font-serif italic leading-[1.1] tracking-tighter mb-2 md:mb-6 uppercase">
                      {loc.title}
                    </h3>
                    <p className="text-[#212121]/70 text-[12px] lg:text-[18px] font-light italic leading-relaxed max-w-[300px] lg:max-w-md mx-auto lg:mx-0 border-none lg:border-l-2 border-[#722F37]/20 lg:pl-8">
                      {loc.desc}
                    </p>
                    
                    {i === 4 && (
                      <button className="group relative px-6 py-3 md:px-8 md:py-4 border-2 border-[#722F37]/40 overflow-hidden transition-all duration-700 hover:border-[#722F37] outline-none mt-4 md:mt-8 rounded-none">
                        <span className="relative z-10 text-[#212121] text-[10px] font-bold uppercase tracking-[0.5em] transition-colors duration-500 group-hover:text-white">
                          Разгледайте 360°
                        </span>
                        <div className="absolute -inset-[1px] bg-[#722F37] translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0 scale-105"></div>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
