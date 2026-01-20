"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const teamPhotos = [
  { id: 1, title: "Майстор готвач", img: "/chef.jpg" },
  { id: 2, title: "Екипът на BABA", img: "/team-photo.jpg" },
  { id: 3, title: "Майстор на BABA", img: "/sommelier.jpg" },
];

export default function AboutContent() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Прагът, при който сменяме текста със снимките на мобилен (0.15 = 15% скрол)
  const MOBILE_SWITCH_POINT = 0.15;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / (rect.height - windowHeight), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getStyle = (index) => {
    const animationEnd = 0.9; 
    const step = animationEnd / teamPhotos.length;
    const start = index * step;
    const end = (index + 1) * step;

    let x = 150; 
    if (scrollProgress > start && scrollProgress <= end) {
      const localProg = (scrollProgress - start) / (end - start);
      x = 150 - (localProg * 150);
    } else if (scrollProgress > end) {
      x = 0;
    }

    return {
      opacity: scrollProgress > start ? 1 : 0,
      transform: `translateX(${x}%) rotate(${index * -3 + 2}deg)`,
      zIndex: 10 + index,
      transition: 'transform 0.1s linear, opacity 0.3s ease-out'
    };
  };

  // Изчисляваме дали сме минали точката на смяна за мобилни
  const isTextHiddenOnMobile = scrollProgress > MOBILE_SWITCH_POINT;

  return (
    <section ref={containerRef} className="relative z-30 bg-[#F5F2ED] h-[300vh]">
      
      <div className="sticky top-0 h-[100dvh] lg:h-screen w-full flex items-center overflow-hidden">
        
        {/* ФОНОВ ВОДЕН ЗНАК */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="relative w-[70vw] aspect-square opacity-[0.03]">
             <Image src="/logo.svg" alt="" fill className="object-contain" />
          </div>
        </div>

        {/* ОСНОВЕН КОНТЕЙНЕР */}
        <div className="
            container mx-auto px-6 md:px-12 lg:px-24 
            relative z-10 w-full h-full 
            lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center
        ">
          
          {/* --- ТЕКСТОВА ЧАСТ --- 
              Mobile: Absolute позиция, центрирана. Изчезва, когато скролнеш.
              Desktop: Static позиция (в грида), винаги видима.
          */}
          <div className={`
              absolute inset-0 flex flex-col justify-center items-center text-center px-6 transition-all duration-700 z-20
              lg:static lg:block lg:text-left lg:col-span-6 lg:pl-12 lg:opacity-100 lg:transform-none lg:pointer-events-auto
              ${isTextHiddenOnMobile ? 'opacity-0 -translate-y-10 pointer-events-none' : 'opacity-100'}
          `}>
            
            <div className="space-y-4 md:space-y-6 flex flex-col items-center lg:items-start mb-8 lg:mb-6">
              <h3 className="text-[#212121] font-serif italic uppercase leading-[1.1] tracking-tighter text-3xl md:text-4xl lg:text-6xl">
                Почитаме традициите <br /> през призмата на <br /> съвремието.
              </h3>
              <div className="h-[1px] w-16 md:w-32 bg-[#722F37]/40"></div>
            </div>

            <div className="
                max-w-md mx-auto lg:mx-0
                text-[#212121]/70 font-light leading-relaxed italic 
                text-sm md:text-lg lg:text-xl
            ">
              <p className="mb-4">
                BABA е родена от мечтата да съберем под един покрив аристократичния дух на стара София и дръзкия вкус на модерната балканска кухня.
              </p>
              <p className="not-italic opacity-80 leading-relaxed">
                Ние не вярваме в компромисите. Затова всяка съставка в нашето меню е плод на дълго търсене на малки ферми и занаятчии.
              </p>
            </div>

            {/* Индикатор за скролване (само за мобилни, докато текста е видим) */}
            <div className={`absolute bottom-10 animate-bounce lg:hidden transition-opacity duration-300 ${isTextHiddenOnMobile ? 'opacity-0' : 'opacity-50'}`}>
                <span className="text-xs uppercase tracking-widest text-[#212121]">Скрол</span>
            </div>
          </div>

          {/* --- ГАЛЕРИЯ СНИМКИ --- 
              Mobile: Absolute позиция, центрирана. Появява се, когато скролнеш.
              Desktop: Static позиция (в грида), винаги видима.
          */}
          <div className={`
              absolute inset-0 flex items-center justify-center transition-all duration-700 z-10
              lg:static lg:block lg:col-span-6 lg:h-[600px] lg:flex lg:items-center lg:justify-end lg:opacity-100 lg:transform-none
              ${isTextHiddenOnMobile ? 'opacity-100' : 'opacity-0 translate-y-10'}
          `}>
            {teamPhotos.map((photo, index) => (
              <div 
                key={photo.id}
                style={getStyle(index)}
                className="
                  absolute bg-white p-2 md:p-3 pb-8 md:pb-20 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.15)] origin-bottom
                  w-[80vw] sm:w-[320px]
                  md:max-w-[240px] 
                  lg:w-full lg:max-w-[420px] 
                  lg:relative lg:bottom-auto
                "
              >
                <div className="relative aspect-[4/5] overflow-hidden grayscale-[10%]">
                  <Image 
                    src={photo.img} 
                    alt={photo.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                
                <div className="absolute bottom-2 md:bottom-6 left-0 w-full text-center">
                  <span className="text-[#212121]/60 font-serif italic text-xs md:text-base tracking-[0.2em] uppercase">
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
