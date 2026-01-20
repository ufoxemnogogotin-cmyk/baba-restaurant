'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const KitchenGallery = () => {
  const scrollContainerRef = useRef(null);
  
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  const originalDishes = [
    "/dish1.jpg", 
    "/dish2.jpg", 
    "/dish3.jpg", 
  ];

  const dishes = [
    ...originalDishes,
    ...originalDishes,
    ...originalDishes,
    ...originalDishes
  ];

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    setShowCursor(!!e.target.closest('.gallery-scroll-area'));
  };

  const handleGalleryClick = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const items = Array.from(container.children).filter(
      child => child.tagName === 'DIV' && !child.classList.contains('spacer')
    );

    const currentScroll = container.scrollLeft;
    let currentIndex = 0;
    let minDistance = Infinity;

    items.forEach((item, index) => {
      const dist = Math.abs(item.offsetLeft - currentScroll);
      if (dist < minDistance) {
        minDistance = dist;
        currentIndex = index;
      }
    });

    const setLength = originalDishes.length;

    if (currentIndex >= items.length - setLength - 1) {
      const resetIndex = currentIndex - setLength * 2;
      if (items[resetIndex]) {
        container.scrollTo({ left: items[resetIndex].offsetLeft, behavior: 'instant' });
        setTimeout(() => {
          const nextItem = items[resetIndex + 1];
          if (nextItem) {
            container.scrollTo({ left: nextItem.offsetLeft, behavior: 'smooth' });
          }
        }, 0);
      }
    } else {
      const nextItem = items[currentIndex + 1];
      if (nextItem) {
        container.scrollTo({ left: nextItem.offsetLeft, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      className="relative w-full md:min-h-screen bg-[#F5F2ED] text-[#212121] overflow-hidden pt-12 md:pt-32 pb-20 md:pb-24"
      onMouseMove={handleMouseMove}
    >

      {/* ЗАГЛАВИЕ – ГОРЕ */}
      <div className="px-6 md:ml-[320px] md:max-w-[50vw] mb-10 md:mb-16">
        <h3 className="text-[#212121] text-3xl md:text-5xl lg:text-[5vw] font-serif italic leading-[1.1] tracking-tight uppercase">
          Вкусът на миналото
        </h3>
      </div>

      {/* ГАЛЕРИЯ */}
      <div className="relative ml-6 md:ml-[320px] w-[calc(100vw-1.5rem)] md:w-[calc(100vw-320px)] mb-12">
        <div className="gallery-scroll-area w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            onClick={handleGalleryClick}
            className={`
              flex items-end overflow-x-auto gap-4 md:gap-6 pr-6 md:pr-10 pb-4
              scrollbar-hide snap-x snap-mandatory w-full
              ${showCursor ? 'cursor-none' : 'cursor-default'}
            `}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {dishes.map((img, index) => {
              const isHorizontal = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`
                    relative flex-shrink-0 snap-start transition-all duration-500
                    ${isHorizontal
                      ? 'w-[280px] h-[200px] md:w-[35vw] md:h-[45vh]'
                      : 'w-[200px] h-[300px] md:w-[25vw] md:h-[55vh]'
                    }
                  `}
                >
                  <img
                    src={img}
                    alt={`Dish ${index}`}
                    className="w-full h-full object-cover transition-all duration-500 block"
                  />
                </div>
              );
            })}

            <div className="spacer w-6 md:w-[50vw] flex-shrink-0"></div>
          </div>
        </div>

        {/* МОБИЛНА СТРЕЛКА */}
        <div className="md:hidden absolute bottom-4 right-4 z-40 pointer-events-none">
          <div className="w-12 h-12 bg-[#F5F2ED] border border-[#1a1a1a] rounded-full flex items-center justify-center opacity-90">
            <ArrowRight className="text-[#1a1a1a] w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ТЕКСТ + CTA */}
      <div className="px-6 md:px-0 md:ml-[320px] md:max-w-[50vw]">
        <p className="text-[#212121]/70 text-[12px] md:text-[18px] font-light italic leading-relaxed max-w-md mb-8">
          „Всяка чиния е разказ, писан преди два века, но прочетен днес с нови сетива.“
        </p>

        <Link
          href="/menu"
          className="group relative inline-block px-6 py-3 md:px-16 md:py-5 border-2 border-[#722F37]/40 overflow-hidden transition-all duration-700 hover:border-[#722F37] outline-none rounded-none"
        >
          <span className="relative z-10 text-[#212121] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] transition-colors duration-500 group-hover:text-white flex items-center gap-3">
            МЕНЮ
            <ArrowRight size={14} className="transition-colors duration-500 group-hover:text-white" />
          </span>
          <div className="absolute inset-0 bg-[#722F37] translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0"></div>
        </Link>
      </div>

      {/* DESKTOP CURSOR */}
      <div
        className="fixed pointer-events-none z-50 hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-[#1a1a1a] shadow-2xl transition-transform duration-100 ease-out mix-blend-multiply"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          opacity: showCursor ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${showCursor ? 1 : 0})`
        }}
      >
        <ArrowRight className="text-[#F5F2ED] w-8 h-8" />
      </div>
    </section>
  );
};

export default KitchenGallery;
