import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const KitchenGallery = () => {
  const scrollContainerRef = useRef(null);
  
  // Състояние за къстъм курсора
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [cursorType, setCursorType] = useState('next'); // 'next' или 'prev'

  // Пътища към снимките
  const dishes = [
    "/dish1.jpg",
    "/dish2.jpg",
    "/dish3.jpg",
    "/dish1.jpg", 
  ];

  // Логика за движение на мишката (Desktop)
  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();

    setCursorPos({
      x: e.clientX,
      y: e.clientY
    });

    // Ако мишката е върху зоната на галерията/снимките
    if (e.target.tagName === 'IMG' || e.target.closest('.gallery-scroll')) {
      setShowCursor(true);
      if (e.clientX < window.innerWidth / 2) {
        setCursorType('prev');
      } else {
        setCursorType('next');
      }
    } else {
      setShowCursor(false);
    }
  };

  // Клик за скролване (Desktop)
  const handleGalleryClick = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth * 0.7;
      if (cursorType === 'next') {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div 
      className="relative w-full min-h-screen bg-[#f3f0e7] text-[#1a1a1a] overflow-hidden font-sans"
      onMouseMove={handleMouseMove}
    >
      {/* --- ЗАГЛАВИЕ (23 GÄNGE) --- */}
      {/* Цвят: Тъмен (#1a1a1a) вместо златен */}
      <div className="absolute top-0 left-4 z-10 pointer-events-none md:pl-12 pt-4">
        <h1 className="font-serif leading-none flex items-start">
          <span className="text-[25vw] md:text-[16vw] font-light text-[#1a1a1a]">23</span>
          <span className="mt-8 md:mt-12 text-2xl md:text-4xl tracking-[0.2em] uppercase ml-[-2vw] text-[#1a1a1a]">
            Gänge
          </span>
        </h1>
      </div>

      {/* --- ГАЛЕРИЯ (SCROLL SECTION) --- */}
      <div className="w-full h-[60vh] md:h-[75vh] flex items-end md:items-center relative z-20 mt-[20vh] md:mt-0">
        <div 
          ref={scrollContainerRef}
          onClick={handleGalleryClick}
          className={`
            gallery-scroll flex overflow-x-auto gap-4 md:gap-12 px-4 md:px-[30vw] 
            scrollbar-hide snap-x snap-mandatory w-full h-full items-center
            ${showCursor ? 'cursor-none' : 'cursor-default'}
          `}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dishes.map((img, index) => (
            <div 
              key={index} 
              className="relative flex-shrink-0 snap-center w-[85vw] md:w-[40vw] h-[45vh] md:h-[60vh]"
            >
              <img 
                src={img} 
                alt={`Dish ${index}`} 
                className="w-full h-full object-cover rounded-sm shadow-xl transition-transform duration-500"
              />
              
              {/* МОБИЛЕН БУТОН (Фиксиран долу вдясно на снимката) */}
              {/* Цвят: Тъмен фон, светла стрелка */}
              <div className="md:hidden absolute bottom-4 right-4 z-30">
                <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg">
                  <ArrowRight className="text-[#f3f0e7] w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
          {/* Spacer в края */}
          <div className="w-[10vw] flex-shrink-0"></div>
        </div>
      </div>

      {/* --- ОПИСАНИЕ И ЛИНК (ДОЛУ) --- */}
      <div className="container mx-auto px-6 py-10 md:py-0 md:absolute md:bottom-12 md:left-0 md:right-0 z-30">
        <div className="md:grid md:grid-cols-12 gap-8">
          <div className="md:col-start-4 md:col-span-6 text-[#1a1a1a] font-light space-y-6">
            <p className="text-lg leading-relaxed font-serif italic">
              "Всяка чиния е разказ, писан преди два века, но прочетен днес с нови сетива."
            </p>
            <p className="text-sm opacity-80 font-sans">
              Bernhard Zimmerl serviert ein fein abgestimmtes 23-Gänge-Menü. Das Menü wurde mit Sorgfalt und Liebe zum Detail kreiert und bleibt in seiner Komposition unverändert.
            </p>

            {/* Бутон МЕНЮ: Тъмен бордър и текст */}
            <Link to="/menupage" className="inline-flex items-center gap-2 mt-4 px-6 py-3 border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f3f0e7] transition-all duration-300 uppercase tracking-widest text-xs font-bold">
              Menü
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* --- КЪСТЪМ КУРСОР (DESKTOP) --- */}
      {/* Цвят: Тъмен кръг (#1a1a1a), светла стрелка (#f3f0e7) */}
      <div 
        className="fixed pointer-events-none z-50 hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-[#1a1a1a] shadow-2xl transition-transform duration-75 ease-out"
        style={{ 
          left: cursorPos.x, 
          top: cursorPos.y,
          opacity: showCursor ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${showCursor ? 1 : 0})`
        }}
      >
        {cursorType === 'next' ? (
          <ArrowRight className="text-[#f3f0e7] w-8 h-8" />
        ) : (
          <ArrowLeft className="text-[#f3f0e7] w-8 h-8" />
        )}
      </div>
    </div>
  );
};

export default KitchenGallery;
