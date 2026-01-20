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

  // --- ЛОГИКА ЗА ДЕСКТОП (СКРОЛ АНИМАЦИЯ) ---
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Тази логика работи коректно, когато контейнерът е висок (на Desktop)
      const progress = Math.min(Math.max(-rect.top / (rect.height - windowHeight), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- СТИЛОВЕ ЗА ДЕСКТОП АНИМАЦИЯТА ---
  const getDesktopStyle = (index) => {
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
      transition: 'transform 0.1s linear, opacity 0.3s ease-out',
      position: 'absolute' // Важно за десктоп стека
    };
  };

  return (
    <section 
      ref={containerRef} 
      // ПРОМЯНА: h-auto за мобилни (нормален поток), 300vh за десктоп (за скрол ефекта)
      className="relative z-30 bg-[#F5F2ED] h-auto lg:h-[300vh]"
    >
      
      {/* WRAPPER:
          Mobile: relative block (нормално подреждане)
          Desktop: sticky top-0 h-screen (заковано за екрана)
      */}
      <div className="relative block lg:sticky lg:top-0 lg:h-screen w-full lg:flex lg:items-center lg:overflow-hidden">
        
        {/* ФОНОВ ВОДЕН ЗНАК */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="relative w-[70vw] aspect-square opacity-[0.03]">
             <Image src="/logo.svg" alt="" fill className="object-contain" />
          </div>
        </div>

        {/* ОСНОВЕН КОНТЕЙНЕР */}
        <div className="
            container mx-auto px-6 md:px-12 lg:px-24 
            flex flex-col 
            lg:grid lg:grid-cols-12 lg:gap-16 lg:justify-center lg:items-center
            relative z-10 w-full h-full 
            py-16 lg:py-0
        ">
          
          {/* --- ТЕКСТОВА ЧАСТ --- */}
          {/* Mobile: Нормален блок най-горе.
             Desktop: Лява колона.
          */}
          <div className="
              w-full mb-16 lg:mb-0
              lg:col-span-6 lg:pl-12 text-center lg:text-left z-20 
          ">
            {/* Заглавие */}
            <div className="space-y-4 md:space-y-6 flex flex-col items-center lg:items-start mb-8">
              <h3 className="text-[#212121] font-serif italic uppercase leading-[1.1] tracking-tighter text-3xl md:text-4xl lg:text-6xl">
                Почитаме традициите <br /> през призмата на <br /> съвремието.
              </h3>
              <div className="h-[1px] w-16 md:w-32 bg-[#722F37]/40"></div>
            </div>

            {/* Параграфи */}
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
          </div>

          {/* --- ГАЛЕРИЯ (ДВА ВАРИАНТА) --- */}
          <div className="w-full lg:col-span-6 relative flex justify-center lg:justify-end lg:h-[600px] lg:items-center">
            
            {/* ВАРИАНТ 1: МОБИЛЕН СЛАЙДЪР (Carousel)
                Видим само на мобилни (lg:hidden).
                Снимките се сменят с плъзгане на пръст (swipe).
            */}
            <div className="lg:hidden w-full overflow-x-auto snap-x snap-mandatory flex gap-4 pb-8 px-4 no-scrollbar">
               {teamPhotos.map((photo) => (
                  <div 
                    key={photo.id}
                    className="
                      relative 
                      min-w-[85vw] sm:min-w-[350px] 
                      snap-center 
                      bg-white p-3 pb-12 
                      shadow-[0_10px_30px_rgba(0,0,0,0.1)] 
                      rounded-sm
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
                    <div className="absolute bottom-4 left-0 w-full text-center">
                      <span className="text-[#212121]/60 font-serif italic text-sm tracking-[0.2em] uppercase">
                        {photo.title}
                      </span>
                    </div>
                  </div>
               ))}
               {/* Spacer за да има въздух в края */}
               <div className="min-w-[5vw] snap-align-none"></div>
            </div>

            {/* ВАРИАНТ 2: ДЕСКТОП СТАК (Скрол анимация)
                Видим само на десктоп (hidden lg:block).
                Използва оригиналната логика с getStyle.
            */}
            <div className="hidden lg:block w-full h-full relative">
                {teamPhotos.map((photo, index) => (
                  <div 
                    key={photo.id}
                    style={getDesktopStyle(index)}
                    className="
                      absolute bg-white p-3 pb-20 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.15)] origin-bottom
                      w-full max-w-[420px] 
                      right-0 top-1/2 -translate-y-1/2
                    "
                  >
                    <div className="relative aspect-[4/5] overflow-hidden grayscale-[10%] hover:grayscale-0 transition-all duration-700">
                      <Image 
                        src={photo.img} 
                        alt={photo.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    
                    <div className="absolute bottom-6 left-0 w-full text-center">
                      <span className="text-[#212121]/60 font-serif italic text-base tracking-[0.2em] uppercase">
                        {photo.title}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
