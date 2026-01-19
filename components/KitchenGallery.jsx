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

  useEffect(() => {
    const handleScroll = () => {
      // Тази логика ще работи само ако екранът е широк (Desktop)
      if (!containerRef.current || window.innerWidth < 1024) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / (rect.height - windowHeight), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getStyle = (index) => {
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
    // На мобилни (max-lg) премахваме височината от 350vh, защото няма да ползваме скрол анимация
    <section ref={containerRef} className="relative z-30 bg-[#F5F2ED] lg:h-[350vh] h-auto py-20 lg:py-0">
      
      {/* STICKY CONTAINER - На мобилни става нормален контейнер (relative) */}
      <div className="relative lg:sticky top-0 h-auto lg:h-screen w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden">
        
        {/* BACKGROUND TEXT (ARTFOOD) - Остава само за десктоп */}
        <div className="hidden lg:flex absolute bottom-0 left-0 w-full justify-start pointer-events-none overflow-hidden z-0">
          <span 
            className="text-[#BAC095]/10 lg:text-[25vw] font-serif italic whitespace-nowrap leading-none"
            style={{ transform: `translateX(${(scrollProgress * 40) - 10}%)` }}
          >
            Artfood
          </span>
        </div>

        <div className="container lg:w-full lg:max-w-1200 mx-auto px-6 md:px-12 lg:px-0 lg:pl-[320px] lg:pr-[15vw] w-full relative h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between z-10">
          
          {/* MOBILE TITLE */}
          <div className="w-full lg:hidden text-center mb-8 flex-shrink-0 z-[50]">
            <h2 className="text-[#212121]/40 uppercase tracking-[0.5em] text-[10px] font-bold">
              Culinary Heritage
            </h2>
          </div>

          {/* TEXT SIDE - На мобилни го качваме отгоре за по-добра йерархия преди карусела */}
          <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start order-1 text-center lg:text-left mb-10 lg:mb-0">
            <h2 className="hidden lg:block text-[#212121]/40 uppercase tracking-[0.8em] text-[10px] font-bold mb-16 opacity-40">
              Culinary Heritage
            </h2>
            <h3 className="text-[#212121] text-4xl md:text-5xl lg:text-[5vw] font-serif italic leading-[1.1] tracking-tighter uppercase mb-6 lg:mb-12">
              Вкусът <br className="hidden lg:block" /> 
              на <br className="hidden lg:block" /> 
              миналото
            </h3>
            <p className="text-[#212121]/70 text-[13px] lg:text-[18px] font-light italic leading-relaxed max-w-[280px] lg:max-w-md mx-auto lg:mx-0 lg:border-l-2 border-[#722F37]/20 lg:pl-8">
              "Всяка чиния е разказ, писан преди два века, но прочетен днес с нови сетива."
            </p>
          </div>

          {/* IMAGES SIDE - MOBILE CAROUSEL / DESKTOP STACK */}
          <div className="order-2 lg:order-2 w-full lg:w-[55%]">
            
            {/* MOBILE: Horizontal Scroll (Snap Carousel) */}
            <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 px-4 pb-10">
              {dishes.map((dish) => (
                <div 
                  key={`mobile-${dish.id}`}
                  className="snap-center shrink-0 w-[80vw] bg-white p-3 pb-10 shadow-xl"
                >
                  <div className="relative aspect-[3.5/5] overflow-hidden">
                    <Image src={dish.img} alt={dish.title} fill className="object-cover" />
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-[#212121]/60 font-serif italic text-[12px] tracking-widest uppercase">
                      {dish.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP: Original Stacked Animation */}
            <div className="hidden lg:flex relative h-[80vh] w-full items-center justify-end">
              {dishes.map((dish, index) => (
                <div 
                  key={`desktop-${dish.id}`}
                  style={getStyle(index)}
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

      {/* Стил за скриване на scrollbar на мобилни */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
