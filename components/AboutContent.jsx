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

  // ---------------------------------------------------------
  // 📱 НАСТРОЙКИ САМО ЗА МОБИЛЕН ТЕЛЕФОН
  // ---------------------------------------------------------
  const mobileConfig = {
    cardWidth: "w-[300px]",       // Ширина на снимката на телефон
    imagesAreaHeight: "h-[45vh]", // Височина на зоната за снимки
    titleSize: "text-2xl",        // Шрифт за заглавието
    textSize: "text-xs",          // Шрифт за текста
    gap: "gap-1"                  // Разстояние между текст и снимки
  };
  // ---------------------------------------------------------

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

  return (
    <section ref={containerRef} className="relative z-30 bg-[#F5F2ED] h-[300vh]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* ФОНОВ ВОДЕН ЗНАК */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="relative w-[70vw] aspect-square opacity-[0.03]">
             <Image src="/logo.svg" alt="" fill className="object-contain" />
          </div>
        </div>

        {/* ОСНОВЕН КОНТЕЙНЕР */}
        <div className={`
            container mx-auto px-6 md:px-12 lg:px-24 
            flex flex-col justify-center
            lg:grid lg:grid-cols-12 lg:gap-16 lg:justify-center 
            items-center relative z-10 w-full h-full 
            pb-20 lg:pb-0 pt-16 lg:pt-0
            ${mobileConfig.gap}
        `}>
          
          {/* --- ТЕКСТОВА ЧАСТ --- */}
          {/* ПРОМЯНА: Добавено е 'lg:pl-24', за да избута текста надясно само на десктоп */}
          <div className="lg:col-span-6 lg:pl-12 text-center lg:text-left flex-shrink-0 z-20 flex flex-col items-center lg:block">
            
            {/* Заглавие */}
            <div className="space-y-3 md:space-y-6 flex flex-col items-center lg:items-start mb-4">
              <h3 className={`text-[#212121] font-serif italic uppercase leading-tight tracking-tighter ${mobileConfig.titleSize} md:text-4xl lg:text-6xl`}>
                Почитаме традициите <br /> през призмата на <br /> съвремието.
              </h3>
              <div className="h-[1px] w-16 md:w-32 bg-[#722F37]/40"></div>
            </div>

            {/* Параграфи */}
            <div className={`max-w-xl text-[#212121]/70 font-light leading-relaxed italic text-left lg:text-left ${mobileConfig.textSize} md:text-lg lg:text-xl`}>
              <p className="mb-3">
                BABA е родена от мечтата да съберем под един покрив аристократичния дух на стара София и дръзкия вкус на модерната балканска кухня.
              </p>
              <p className="not-italic opacity-80 leading-loose">
                Ние не вярваме в компромисите. Затова всяка съставка в нашето меню е плод на дълго търсене на малки ферми и занаятчии.
              </p>
            </div>
          </div>

          {/* --- ГАЛЕРИЯ СНИМКИ --- */}
          <div className={`
              lg:col-span-6 relative w-full flex items-center justify-center 
              lg:h-[600px] lg:justify-end lg:mt-0
              ${mobileConfig.imagesAreaHeight}
          `}>
            {teamPhotos.map((photo, index) => (
              <div 
                key={photo.id}
                style={getStyle(index)}
                className={`
                  absolute bg-white p-2 md:p-3 pb-8 md:pb-20 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] transition-all duration-700
                  ${mobileConfig.cardWidth}
                  md:max-w-[240px] 
                  lg:w-full lg:max-w-[420px] 
                `}
              >
                <div className="relative aspect-[4/5] overflow-hidden grayscale-[20%] transition-all duration-700 hover:grayscale-0">
                  <Image 
                    src={photo.img} 
                    alt={photo.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                
                <div className="absolute bottom-2 md:bottom-6 left-0 w-full text-center">
                  <span className="text-[#212121]/50 font-serif italic text-[10px] md:text-base tracking-[0.2em] uppercase">
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
