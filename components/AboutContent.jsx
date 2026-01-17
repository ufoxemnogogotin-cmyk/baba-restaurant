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

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Изчисляваме прогреса спрямо височината на секцията (300vh)
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

    let x = 150; // Начална позиция извън екрана
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
      {/* Sticky контейнер, който държи текста и снимките на екрана */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* ФОНОВ ВОДЕН ЗНАК - ЛОГО */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="relative w-[70vw] aspect-square opacity-[0.03]">
             <Image src="/logo.svg" alt="" fill className="object-contain" />
          </div>
        </div>

        <div className="container mx-auto px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
          
          {/* ТЕКСТОВА ЧАСТ - ФИКСИРАНА */}
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-6">
              <h3 className="text-[#212121] text-4xl lg:text-6xl font-serif italic uppercase leading-tight tracking-tighter">
                Почитаме традициите <br /> през призмата на <br /> съвремието.
              </h3>
              <div className="h-[1px] w-32 bg-[#722F37]/40"></div>
            </div>

            <div className="max-w-xl space-y-8 text-[#212121]/70 text-lg lg:text-xl font-light leading-relaxed italic">
              <p>
                BABA е родена от мечтата да съберем под един покрив аристократичния дух на стара София и дръзкия вкус на модерната балканска кухня.
              </p>
              <p className="not-italic text-[16px] opacity-80 leading-loose">
                Ние не вярваме в компромисите. Затова всяка съставка в нашето меню е плод на дълго търсене на малки ферми и занаятчии.
              </p>
            </div>
          </div>

          {/* ГАЛЕРИЯ СЪС СТАКВАЩИ СЕ СНИМКИ */}
          <div className="lg:col-span-6 relative h-[600px] w-full flex items-center justify-end">
            {teamPhotos.map((photo, index) => (
              <div 
                key={photo.id}
                style={getStyle(index)}
                className="absolute w-full max-w-[420px] bg-white p-3 pb-20 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] transition-all duration-700"
              >
                <div className="relative aspect-[4/5] overflow-hidden grayscale-[20%] transition-all duration-700 hover:grayscale-0">
                  <Image 
                    src={photo.img} 
                    alt={photo.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                
                {/* Подпис тип Polaroid */}
                <div className="absolute bottom-6 left-0 w-full text-center">
                  <span className="text-[#212121]/50 font-serif italic text-base tracking-[0.2em] uppercase">
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