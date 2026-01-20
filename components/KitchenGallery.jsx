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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Проверка за мобилно устройство
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
    // 2. Ако сме на мобилно устройство, изключваме JS анимациите напълно
    if (isMobile) return {};

    const animationEnd = 0.85; 
    const step = animationEnd / dishes.length;
    const start = index * step;
    const end = (index + 1) * step;

    let x = index === 0 ? 0 : 150; 

    if (scrollProgress > start && scrollProgress <= end) {
      const localProg = (scrollProgress - start) / (end - start);
      x = index === 0 ? 0 : 150 - (localProg * 150);
    } else if (scrollProgress > end) {
      x = 0;
    }

    return {
      opacity: index === 0 ? 1 : (scrollProgress > start ? 1 : 0),
      transform: `translateX(${x}%) rotate(${index * 2}deg)`,
      zIndex: 10 + index,
      transition: 'transform 0.1s linear, opacity 0.3s ease-out'
    };
  };

  return (
    // 3. Промяна на височината: h-auto на мобилни, h-[350vh] само на lg (десктоп)
    <section ref={containerRef} className="relative z-30 bg-[#F5F2ED] h-auto lg:h-[350vh]">
      
      {/* 4. Sticky container: Само на десктоп е sticky. На мобилни е normal flow (flex-col) */}
      <div className="relative lg:sticky top-0 w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden min-h-[100dvh] lg:h-screen py-12 lg:py-0">
        
        {/* BACKGROUND TEXT (ARTFOOD) - Само за десктоп */}
        <div className="hidden lg:flex absolute bottom-0 left-0 w-full justify-start pointer-events-none overflow-hidden z-0">
          <span 
            className="text-[#BAC095]/10 lg:text-[25vw] font-serif italic whitespace-nowrap leading-none"
            style={{ transform: `translateX(${(scrollProgress * 40) - 10}%)` }}
          >
            Artfood
          </span>
        </div>

        {/* MAIN CONTENT CONTAINER */}
        <div className="container lg:w-full lg:max-w-1200 mx-auto px-0 md:px-12 lg:px-0 lg:pl-[320px] lg:pr-[15vw] w-full relative h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between z-10">
          
          {/* MOBILE TITLE */}
          <div className="w-full lg:hidden text-center mb-8 flex-shrink-0 z-[50] px-6">
            <h2 className="text-[#212121]/40 uppercase tracking-[0.5em] text-[10px] font-bold">
              Culinary Heritage
            </h2>
          </div>

          {/* IMAGES SIDE */}
          {/* 5. Контейнер за снимките: 
              - Desktop: relative, h-[80vh], items-center
              - Mobile: flex, overflow-x-auto (слайдър), snap-x (залепяне)
          */}
          <div className="
            w-full flex order-1 lg:order-2 flex-shrink-0 mb-8 lg:mb-0
            lg:relative lg:h-[80vh] lg:w-[55%] lg:items-center lg:justify-end lg:block
            overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 pb-4 gap-4 items-center
          ">
            {dishes.map((dish, index) => (
              <div 
                key={dish.id}
                style={getStyle(index)}
                // 6. Стил на картите:
                // - Desktop: absolute, w-[400px]
                // - Mobile: relative, min-w-[85vw] (почти цял екран), snap-center (центриране при слайд)
                className="
                  bg-white p-2 pb-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] origin-bottom
                  lg:absolute lg:w-[400px] lg:p-4 lg:pb-20 
                  relative min-w-[80vw] sm:min-w-[320px] snap-center flex-shrink-0
                "
              >
                <div className="relative aspect-[3.5/5] overflow-hidden grayscale-[10%]">
                  <Image src={dish.img} alt={dish.title} fill className="object-cover" priority={index === 0} />
                </div>
                <div className="absolute bottom-2 lg:bottom-6 left-0 w-full text-center px-2">
                  <span className="text-[#212121]/60 font-serif italic text-[14px] tracking-[0.2em] uppercase block truncate">
                    {dish.title}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Spacer за десния край на слайдъра на мобилни */}
            <div className="w-2 lg:hidden flex-shrink-0"></div>
          </div>

          {/* TEXT SIDE */}
          <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start order-2 lg:order-1 text-center lg:text-left flex-shrink-0 px-6 lg:px-0">
            <h2 className="hidden lg:block text-[#212121]/40 uppercase tracking-[0.8em] text-[10px] font-bold mb-16 opacity-40">
              Culinary Heritage
            </h2>
            
            <h3 className="text-[#212121] text-4xl md:text-5xl lg:text-[5vw] font-serif italic leading-[1] tracking-tighter uppercase mb-6 lg:mb-12">
              Вкусът <br className="hidden lg:block" /> 
              на <br className="hidden lg:block" /> 
              миналото
            </h3>
            
            <p className="text-[#212121]/70 text-[14px] lg:text-[18px] font-light italic leading-relaxed max-w-[300px] lg:max-w-md mx-auto lg:mx-0 border-none lg:border-l-2 border-[#722F37]/20 lg:pl-8">
              "Всяка чиния е разказ, писан преди два века, но прочетен днес с нови сетива."
            </p>
          </div>

        </div>
      </div>
      
      {/* Скриване на скролбара за слайдъра */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
