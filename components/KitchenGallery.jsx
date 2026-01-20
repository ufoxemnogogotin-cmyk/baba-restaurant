"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const dishes = [
  { id: 1, title: "Балканска душа", img: "/images/dish1.jpg" }, // Провери дали имената на снимките са тези
  { id: 2, title: "Традиция", img: "/images/dish2.jpg" },
  { id: 3, title: "Спомен", img: "/images/dish3.jpg" },
];

export default function KitchenGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMobileScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const index = Math.round(scrollLeft / (width * 0.8));
    if (index !== activeIndex) setActiveIndex(index);
  };

  const getDesktopStyle = (index) => {
    const diff = index - activeIndex;
    if (diff < 0) return { opacity: 0, transform: 'translateX(-50px) scale(0.9)', zIndex: 0 };
    return {
      zIndex: 10 - index,
      transform: `translateX(-${index * 40}px) scale(${1 - index * 0.05}) rotate(${index * 2}deg)`,
      opacity: 1 - index * 0.25,
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  return (
    <section className="relative bg-[#FDFCF8] py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* TEXT AREA */}
          <div className="w-full lg:w-1/2 space-y-8 z-10">
            <h3 className="font-serif text-[40px] lg:text-[72px] leading-[1.1] text-[#212121] uppercase">
              Вкусът <br className="hidden lg:block" /> на <br className="hidden lg:block" /> миналото
            </h3>
            <p className="hidden lg:block text-[#212121]/70 text-[18px] font-light italic leading-relaxed max-w-md border-l-2 border-[#722F37]/20 lg:pl-8">
              "Всяка чиния е разказ, писан преди два века, но прочетен днес с нови сетива."
            </p>
          </div>

          {/* IMAGES AREA */}
          <div className="w-full lg:w-[45%] relative">
            
            {/* MOBILE ONLY - ОПРАВЕНА МЕКА СЯНКА */}
            <div className="block lg:hidden w-screen overflow-visible relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <div 
                onScroll={handleMobileScroll}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 px-[10vw] pb-12 overflow-y-visible"
              >
                {dishes.map((dish) => (
                  <div 
                    key={`mob-${dish.id}`} 
                    className="snap-center shrink-0 w-[80vw] bg-white p-2 pb-10 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image 
                        src={dish.img} 
                        alt={dish.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div className="mt-6 text-center">
                      <span className="text-[#212121]/50 font-serif italic text-[12px] tracking-[0.2em] uppercase">
                        {dish.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Dots */}
              <div className="flex justify-center gap-3 mt-0">
                {dishes.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-[1px] transition-all duration-500 ${activeIndex === i ? "w-8 bg-[#722F37]" : "w-3 bg-[#212121]/10"}`} 
                  />
                ))}
              </div>
            </div>

            {/* DESKTOP ONLY */}
            <div className="hidden lg:flex relative h-[80vh] w-full items-center justify-end">
              {dishes.map((dish, index) => (
                <div 
                  key={`dt-${dish.id}`} 
                  style={getDesktopStyle(index)} 
                  className="absolute lg:w-[400px] bg-white lg:p-4 lg:pb-20 shadow-[0_20px_50px_rgba(0,0,0,0.12)] origin-bottom"
                >
                  <div className="relative aspect-[3.5/5] overflow-hidden grayscale-[10%]">
                    <Image 
                      src={dish.img} 
                      alt={dish.title} 
                      fill 
                      className="object-cover" 
                      priority={index === 0} 
                    />
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
