"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const dishes = [
  { id: 1, title: "Модерна Традиция", img: "/dish1.jpg" },
  { id: 2, title: "Артизански Детайл", img: "/dish2.jpg" },
  { id: 3, title: "Балканска Душа", img: "/dish3.jpg" },
];

export default function KitchenGallery() {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Специфичен хендлър за мобилните точки (dots), който не товари скрола
  const handleMobileScroll = (e) => {
    if (window.innerWidth >= 1024) return;
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  useEffect(() => {
    const handleScroll = () => {
      // ИЗКЛЮЧВАМЕ логиката за телефон - тя работи само на Desktop (1024px+)
      if (!containerRef.current || window.innerWidth < 1024) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / (rect.height - windowHeight), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ОРИГИНАЛНИЯТ СТИЛ ЗА DESKTOP - НЕ Е ПРОМЕНЯН
  const getDesktopStyle = (index) => {
    const animationEnd = 0.85; 
    const step = animationEnd / dishes.length;
    const start = index * step;
    const end = (index + 1) * step;
    let x = index === 0 ? 0 : 150; 
    if (scrollProgress > start && scrollProgress <= end) {
      const localProg = (scrollProgress - start) / (end - start);
      x = index === 0 ? 0 : 150 - (localProg * 150);
    } else if (scrollProgress > end) { x = 0; }
    return {
      opacity: index === 0 ? 1 : (scrollProgress > start ? 1 : 0),
      transform: `translateX(${x}%) rotate(${index * 2}deg)`,
      zIndex: 10 + index,
      transition: 'transform 0.1s linear, opacity 0.3s ease-out'
    };
  };

  return (
    // На мобилни h-auto, за да не се борим с лентата на браузъра (Safari/Chrome nav)
    <section ref={containerRef} className="relative z-30 bg-[#F5F2ED] lg:h-[350vh] h-auto min-h-[100dvh] py-10 lg:py-0">
      
      <div className="relative lg:sticky top-0 h-full lg:h-screen w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden">
        
        {/* BACKGROUND TEXT (ARTFOOD) - Само за Desktop */}
        <div className="hidden lg:flex absolute bottom-0 left-0 w-full justify-start pointer-events-none z-0">
          <span 
            className="text-[#BAC095]/10 lg:text-[25vw] font-serif italic whitespace-nowrap leading-none"
            style={{ transform: `translateX(${(scrollProgress * 40) - 10}%)` }}
          >
            Artfood
          </span>
        </div>

        <div className="container mx-auto px-4 lg:px-0 lg:pl-[200px] lg:pr-[15vw] w-full flex flex-col lg:flex-row items-center justify-between z-10">
          
          {/* TEXT AREA - Напълно независими стилове за мобилни/десктоп */}
          <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left mb-6 lg:mb-0">
            <h2 className="text-[#212121]/40 uppercase tracking-[0.4em] text-[10px] lg:text-[10px] font-bold mb-2 lg:mb-16">
              Culinary Heritage
            </h2>
            <h3 className="text-[#212121] text-3xl md:text-5xl lg:text-[5vw] font-serif italic leading-[1.1] uppercase mb-4 lg:mb-12">
              Вкусът <br className="hidden lg:block" /> на <br className="hidden lg:block" /> миналото
            </h3>
            
            {/* Desktop цитат */}
            <p className="hidden lg:block text-[#212121]/70 text-[18px] font-light italic leading-relaxed max-w-md border-l-2 border-[#722F37]/20 pl-8">
              "Всяка чиния е разказ, писан преди два века, но прочетен днес с нови сетива."
            </p>
          </div>

          {/* IMAGES AREA */}
          <div className="w-full lg:w-[55%] relative">
            
            {/* MOBILE ONLY: CAROUSEL (Snap Scroll) - Не зависи от JS скрола на браузъра */}
            <div className="block lg:hidden w-full">
              <div 
                onScroll={handleMobileScroll}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-5 px-10 pb-8"
              >
                {dishes.map((dish) => (
                  <div 
                    key={`mob-${dish.id}`} 
                    className="snap-center shrink-0 w-[75vw] bg-white p-2 pb-8 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image src={dish.img} alt={dish.title} fill className="object-cover" />
                    </div>
                    <div className="mt-4 text-center">
                      <span className="text-[#212121]/60 font-serif italic text-[11px] tracking-[0.2em] uppercase">
                        {dish.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Скрол индикатор (Dots) */}
              <div className="flex justify-center gap-2 mt-2">
                {dishes.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-[2px] transition-all duration-300 ${activeIndex === i ? "w-6 bg-[#722F37]" : "w-2 bg-[#212121]/10"}`}
                  />
                ))}
              </div>

              {/* Мобилен цитат - Под снимките, за да не пречи горе */}
              <div className="mt-8 px-6 text-center">
                <p className="text-[#212121]/70 text-[12px] font-light italic leading-relaxed">
                   "Всяка чиния е разказ, писан преди два века, но прочетен днес с нови сетива."
                </p>
              </div>
            </div>

            {/* DESKTOP ONLY: ORIGINAL STACKED ANIMATION - Не е пипана */}
            <div className="hidden lg:flex relative h-[80vh] w-full items-center justify-end">
              {dishes.map((dish, index) => (
                <div 
                  key={`dt-${dish.id}`} 
                  style={getDesktopStyle(index)} 
                  className="absolute lg:w-[400px] bg-white lg:p-4 lg:pb-20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] origin-bottom"
                >
                  <div className="relative aspect-[3.5/5] overflow-hidden grayscale-[10%]">
                    <Image src={dish.img} alt={dish.title} fill className="object-cover" priority={index === 0} />
                  </div>
                  <div className="absolute lg:bottom-6 left-0 w-full text-center px-2">
                    <span className="text-[#212121]/60 font-serif italic lg:text-[14px] tracking-[0.2em] uppercase block truncate">
                      {dish.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
