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
  const mobileSliderRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  // --- ЛОГИКА САМО ЗА ДЕСКТОП (СКРОЛ АНИМАЦИЯ) ---
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

  // --- ЛОГИКА САМО ЗА МОБИЛЕН (СЛАЙДЪР ИНДИКАТОРИ) ---
  const handleMobileScroll = () => {
    if (mobileSliderRef.current) {
      const scrollLeft = mobileSliderRef.current.scrollLeft;
      const width = mobileSliderRef.current.offsetWidth; // Ширината на видимата част
      const center = scrollLeft + (width / 2); // Центъра на екрана
      
      // Тъй като картите са по-малки от екрана, изчисляваме на база децата
      // Най-просто: делим скрола на ширината на една карта (приблизително)
      const newIndex = Math.round(scrollLeft / (window.innerWidth * 0.85));
      
      // Ограничаваме индекса да не излиза извън масива
      const clampedIndex = Math.min(Math.max(newIndex, 0), dishes.length - 1);
      setActiveSlide(clampedIndex);
    }
  };

  // --- СТИЛОВЕ ЗА ДЕСКТОП АНИМАЦИЯТА ---
  const getDesktopStyle = (index) => {
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
      transition: 'transform 0.1s linear, opacity 0.3s ease-out',
      position: 'absolute' // Важно: Това важи само за десктоп контейнера
    };
  };

  return (
    <section ref={containerRef} className="relative z-30 bg-[#F5F2ED] h-auto lg:h-[350vh]">
      
      {/* Sticky Container */}
      <div className="relative lg:sticky top-0 w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden min-h-[100dvh] lg:h-screen py-12 lg:py-0">
        
        {/* BACKGROUND TEXT (ARTFOOD) - Само за Desktop */}
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
          <div className="w-full lg:hidden text-center mb-6 flex-shrink-0 z-[50] px-6">
            <h2 className="text-[#212121]/40 uppercase tracking-[0.5em] text-[10px] font-bold">
              Culinary Heritage
            </h2>
          </div>

          {/* === ТУК Е ГОЛЯМАТА ПРОМЯНА === */}
          {/* Разделяме контейнерите за снимки на два напълно независими блока */}
          
          <div className="w-full flex flex-col items-center order-1 lg:order-2 flex-shrink-0 mb-8 lg:mb-0 lg:w-[55%] lg:relative lg:h-[80vh]">
            
            {/* 1. МОБИЛЕН СЛАЙДЪР (Видим само до lg) */}
            {/* Това е чист CSS слайдър, без JS анимации за позиция */}
            <div className="block lg:hidden w-full relative">
              <div 
                ref={mobileSliderRef}
                onScroll={handleMobileScroll}
                className="
                  flex 
                  w-full
                  overflow-x-auto 
                  snap-x snap-mandatory 
                  scrollbar-hide 
                  px-6 
                  pb-4
                  gap-4
                  items-center
                "
              >
                {dishes.map((dish) => (
                  <div 
                    key={dish.id}
                    className="
                      bg-white p-2 pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)] 
                      relative 
                      min-w-[85vw] /* Заема 85% от екрана, за да се вижда малко от следващата */
                      snap-center 
                      flex-shrink-0
                      rounded-sm
                    "
                  >
                    <div className="relative aspect-[3.5/5] overflow-hidden grayscale-[10%]">
                      <Image src={dish.img} alt={dish.title} fill className="object-cover" />
                    </div>
                    <div className="absolute bottom-4 left-0 w-full text-center px-2">
                      <span className="text-[#212121]/60 font-serif italic text-[14px] tracking-[0.2em] uppercase block truncate">
                        {dish.title}
                      </span>
                    </div>
                  </div>
                ))}
                {/* Празно място накрая, за да може последната карта да се центрира */}
                <div className="min-w-[4vw] h-full flex-shrink-0 snap-align-none"></div>
              </div>

              {/* ИНДИКАТОРИ (ТОЧКИ) - Само в мобилния контейнер */}
              <div className="flex justify-center gap-3 mt-4 w-full">
                {dishes.map((_, index) => (
                  <div
                    key={index}
                    className={`
                      h-2 rounded-full transition-all duration-300
                      ${index === activeSlide ? 'bg-[#722F37] w-8' : 'bg-[#212121]/20 w-2'}
                    `}
                  />
                ))}
              </div>
            </div>

            {/* 2. ДЕСКТОП СТАК (Видим само от lg нагоре) */}
            {/* Тук ползваме getDesktopStyle за сложните анимации */}
            <div className="hidden lg:block w-full h-full relative">
               {dishes.map((dish, index) => (
                <div 
                  key={dish.id}
                  style={getDesktopStyle(index)}
                  className="
                    bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] origin-bottom
                    w-[400px] p-4 pb-20 
                  "
                >
                  <div className="relative aspect-[3.5/5] overflow-hidden grayscale-[10%]">
                    <Image src={dish.img} alt={dish.title} fill className="object-cover" priority={index === 0} />
                  </div>
                  <div className="absolute bottom-6 left-0 w-full text-center px-2">
                    <span className="text-[#212121]/60 font-serif italic text-[14px] tracking-[0.2em] uppercase block truncate">
                      {dish.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* TEXT SIDE - Без промяна */}
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
      
      {/* Скриване на скролбара */}
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
