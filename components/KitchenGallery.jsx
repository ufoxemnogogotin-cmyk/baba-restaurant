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
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Изчисляване на прогреса спрямо височината на секцията (350vh)
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

    let x = 150; 
    if (scrollProgress > start && scrollProgress <= end) {
      const localProg = (scrollProgress - start) / (end - start);
      x = 150 - (localProg * 150);
    } else if (scrollProgress > end) {
      x = 0;
    }

    return {
      opacity: scrollProgress > start ? 1 : 0,
      transform: `translateX(${x}%) rotate(${index * 1.5}deg)`,
      zIndex: 10 + index,
      transition: 'transform 0.1s linear, opacity 0.3s ease-out'
    };
  };

  return (
    <section ref={containerRef} className="relative z-30 bg-[#F5F2ED] h-[350vh]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden lg:pl-[120px]">
        
        {/* ARTFOOD - ФОНОВ ПАРАЛАКС ТЕКСТ В ЦВЯТ #BAC095 */}
        <div className="absolute bottom-10 left-0 w-full flex justify-start pointer-events-none overflow-hidden z-0">
          <span 
            className="text-[#BAC095]/15 text-[25vw] font-serif italic whitespace-nowrap transition-transform duration-150 ease-out"
            style={{ 
              transform: `translateX(${(scrollProgress * 60) - 20}%) translateY(25%)` 
            }}
          >
            Artfood
          </span>
        </div>

        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-20 w-full relative z-10">
          
          {/* ТЕКСТОВА ЧАСТ - ЦВЯТ #212121 */}
          <div className="lg:w-1/3 space-y-12 z-50 mb-20 relative">
            <div className="space-y-4">
              <h2 className="text-[#212121]/40 uppercase tracking-[1em] text-[10px] font-bold">
                Culinary Heritage
              </h2>
              <h3 className="text-[#212121] text-6xl md:text-8xl font-serif italic leading-[0.9] tracking-tighter uppercase">
                Вкусът на <br /> миналото
              </h3>
            </div>
            <p className="text-[#212121]/70 text-lg font-light italic leading-relaxed max-w-sm">
              "Всяка чиния е разказ, писан преди два века, но прочетен днес с нови сетива."
            </p>
          </div>

          {/* ГАЛЕРИЯ С ПОЛАРОИД ЕФЕКТ */}
          <div className="lg:w-2/3 relative h-[650px] w-full flex items-center justify-center">
            {dishes.map((dish, index) => (
              <div 
                key={dish.id}
                style={getStyle(index)}
                className="absolute w-[420px] bg-white p-3 pb-16 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden grayscale-[10%] transition-all duration-700 hover:grayscale-0">
                  <Image 
                    src={dish.img} 
                    alt={dish.title} 
                    fill 
                    className="object-cover" 
                    priority={index === 0} 
                  />
                </div>
                
                {/* Подпис под снимката */}
                <div className="absolute bottom-5 left-0 w-full text-center">
                  <span className="text-[#212121]/60 font-serif italic text-base tracking-[0.3em] uppercase">
                    {dish.title}
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