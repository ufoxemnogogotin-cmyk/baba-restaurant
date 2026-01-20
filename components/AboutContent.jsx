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
  // 📱 НАСТРОЙКИ ЗА МОБИЛЕН ТЕЛЕФОН (Оптимизирани)
  // ---------------------------------------------------------
  const mobileConfig = {
    cardWidth: "w-[85vw] sm:w-[320px]", // По-широка карта за по-добър вид
    imagesAreaHeight: "h-[45vh]",       // Запазваме пропорцията
    titleSize: "text-3xl",              // По-голямо и четливо заглавие
    textSize: "text-sm",                // Оптимален размер за основен текст
    gap: "gap-6"                        // Повече въздух между елементите
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
      {/* Използваме h-[100dvh] за мобилни, за да избегнем проблеми с адресната лента */}
      <div className="sticky top-0 h-[100dvh] lg:h-screen w-full flex items-center overflow-hidden">
        
        {/* ФОНОВ ВОДЕН ЗНАК */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="relative w-[70vw] aspect-square opacity-[0.03]">
             <Image src="/logo.svg" alt="" fill className="object-contain" />
          </div>
        </div>

        {/* ОСНОВЕН КОНТЕЙНЕР */}
        <div className={`
            container mx-auto px-6 md:px-12 lg:px-24 
            flex flex-col justify-between lg:justify-center      /* justify-between разпъва текст горе, снимки долу на мобилен */
            lg:grid lg:grid-cols-12 lg:gap-16 
            items-center relative z-10 w-full h-full 
            py-8 lg:py-0                                         /* Падинг за мобилни */
            ${mobileConfig.gap}
        `}>
          
          {/* --- ТЕКСТОВА ЧАСТ --- */}
          {/* Flex-1 позволява на текста да заеме горната част, но не повече от необходимото */}
          <div className="flex-1 flex flex-col justify-center lg:block lg:col-span-6 lg:pl-12 text-center lg:text-left z-20 w-full">
            
            {/* Заглавие */}
            <div className="space-y-4 md:space-y-6 flex flex-col items-center lg:items-start mb-6">
              <h3 className={`text-[#212121] font-serif italic uppercase leading-[1.1] tracking-tighter ${mobileConfig.titleSize} md:text-4xl lg:text-6xl`}>
                Почитаме традициите <br /> през призмата на <br /> съвремието.
              </h3>
              <div className="h-[1px] w-16 md:w-32 bg-[#722F37]/40"></div>
            </div>

            {/* Параграфи */}
            <div className={`
                max-w-md mx-auto lg:mx-0
                text-[#212121]/70 font-light leading-relaxed italic 
                ${mobileConfig.textSize} md:text-lg lg:text-xl
            `}>
              <p className="mb-4">
                BABA е родена от мечтата да съберем под един покрив аристократичния дух на стара София и дръзкия вкус на модерната балканска кухня.
              </p>
              <p className="not-italic opacity-80 leading-relaxed">
                Ние не вярваме в компромисите. Затова всяка съставка в нашето меню е плод на дълго търсене на малки ферми и занаятчии.
              </p>
            </div>
          </div>

          {/* --- ГАЛЕРИЯ СНИМКИ --- */}
          {/* На мобилен е фиксирана долу, на десктоп си е в грида */}
          <div className={`
              lg:col-span-6 relative w-full flex items-end lg:items-center justify-center 
              lg:h-[600px] lg:justify-end lg:mt-0
              ${mobileConfig.imagesAreaHeight}
              mb-4 lg:mb-0
          `}>
            {teamPhotos.map((photo, index) => (
              <div 
                key={photo.id}
                style={getStyle(index)}
                className={`
                  absolute bg-white p-2 md:p-3 pb-8 md:pb-20 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.15)] origin-bottom
                  ${mobileConfig.cardWidth}
                  md:max-w-[240px] 
                  lg:w-full lg:max-w-[420px] 
                  bottom-0 lg:bottom-auto       /* Гарантираме, че на мобилен са залепени долу */
                `}
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
