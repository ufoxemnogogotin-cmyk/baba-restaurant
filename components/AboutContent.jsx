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
  
  // State за мобилната интеракция (коя карта е най-отгоре)
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  // --- ЛОГИКА ЗА ДЕСКТОП (СКРОЛ АНИМАЦИЯ) ---
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

  // --- ЛОГИКА ЗА МОБИЛЕН ТЕЛЕФОН (CLICK TO SWAP) ---
  const handleMobileTap = () => {
    setActiveMobileIndex((prev) => (prev + 1) % teamPhotos.length);
  };

  // --- СТИЛОВЕ ЗА ДЕСКТОП ---
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
      position: 'absolute'
    };
  };

  // --- СТИЛОВЕ ЗА МОБИЛЕН (STACKED CARDS) ---
  const getMobileStackStyle = (index) => {
    // Изчисляваме позицията на картата спрямо активната
    // 0 = най-отгоре, 1 = втора, 2 = трета (най-отдолу)
    const length = teamPhotos.length;
    const position = (index - activeMobileIndex + length) % length;

    // Настройки за визията на "купчината"
    const scale = 1 - position * 0.05; // Всяка задна карта е малко по-малка
    const translateY = position * 10;  // Всяка задна карта е малко по-надолу
    const zIndex = length - position;  // Активната е с най-висок Z-index
    const opacity = position > 2 ? 0 : 1; // Скриваме картите, ако са твърде назад (за по-големи масиви)
    
    // Лека ротация за реализъм (фиксирана за всяка позиция или индекс)
    const rotate = index % 2 === 0 ? position * 2 : position * -2; 

    return {
      transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
      zIndex: zIndex,
      opacity: opacity,
      transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)', // Мазна анимация
      position: 'absolute'
    };
  };

  return (
    <section 
      ref={containerRef} 
      className="relative z-30 bg-[#F5F2ED] h-auto lg:h-[300vh]"
    >
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
          <div className="
              w-full mb-12 lg:mb-0
              lg:col-span-6 lg:pl-12 text-center lg:text-left z-20 
          ">
            <div className="space-y-4 md:space-y-6 flex flex-col items-center lg:items-start mb-8">
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
          </div>

          {/* --- ГАЛЕРИЯ --- */}
          <div className="w-full lg:col-span-6 relative flex justify-center lg:justify-end lg:h-[600px] lg:items-center">
            
            {/* === ВАРИАНТ 1: МОБИЛЕН STACK (Тесте карти) === 
                Интеракция: Натисни най-горната, за да я преместиш отзад.
            */}
            <div className="lg:hidden relative w-full h-[450px] flex justify-center items-start mt-4 perspective-1000">
               
               {/* Инструкция за потребителя */}
               <div className="absolute -top-8 text-[#212121]/40 text-[10px] uppercase tracking-widest animate-pulse">
                  Tap to view next photo
               </div>

               {teamPhotos.map((photo, index) => (
                  <div 
                    key={photo.id}
                    onClick={handleMobileTap}
                    style={getMobileStackStyle(index)}
                    className="
                      bg-white p-3 pb-16 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm cursor-pointer
                      w-[80vw] sm:w-[320px]
                      will-change-transform
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
                    <div className="absolute bottom-6 left-0 w-full text-center">
                      <span className="text-[#212121]/60 font-serif italic text-base tracking-[0.2em] uppercase">
                        {photo.title}
                      </span>
                    </div>
                  </div>
               ))}
            </div>

            {/* === ВАРИАНТ 2: ДЕСКТОП СТАК (Скрол анимация) === */}
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
