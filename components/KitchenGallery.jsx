import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

// Примерни пътища към снимките - увери се, че са в public папката ти
const dishes = [
  "/dish1.jpg",
  "/dish2.jpg",
  "/dish3.jpg",
  "/dish1.jpg", // Повтаряме за демо ефекта на скролване
];

const KitchenGallery = () => {
  const scrollContainerRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [cursorType, setCursorType] = useState('next'); // 'next' или 'prev'

  // Следене на движението на мишката за къстъм курсора
  const handleMouseMove = (e) => {
    if (!scrollContainerRef.current) return;
    
    // Взимаме позицията на контейнера
    const rect = scrollContainerRef.current.getBoundingClientRect();
    
    // Проверяваме дали мишката е вътре в контейнера със снимките
    const isInside = 
      e.clientX >= rect.left && 
      e.clientX <= rect.right && 
      e.clientY >= rect.top && 
      e.clientY <= rect.bottom;

    setShowCursor(isInside);

    if (isInside) {
      setCursorPos({
        x: e.clientX,
        y: e.clientY
      });

      // Логика: Ако сме в лявата половина на екрана -> стрелка наляво, иначе надясно
      if (e.clientX < window.innerWidth / 2) {
        setCursorType('prev');
      } else {
        setCursorType('next');
      }
    }
  };

  // Функция за клик върху галерията (само за десктоп чрез къстъм курсора)
  const handleGalleryClick = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth * 0.6; // Скролваме 60% от екрана
      if (cursorType === 'next') {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      className="relative w-full min-h-screen bg-[#1a2e2a] text-white overflow-hidden py-12 md:py-20"
      onMouseMove={handleMouseMove}
    >
      {/* --- ЗАГЛАВИЕ (23 GÄNGE) --- */}
      {/* Позиционирано абсолютно, за да застъпва снимките леко или да стои отстрани */}
      <div className="absolute top-4 left-4 z-20 md:static md:container md:mx-auto md:mb-[-4rem] md:pl-10 pointer-events-none">
        <h2 className="font-serif text-[#d4a373] flex items-baseline leading-none">
          <span className="text-[8rem] md:text-[14rem] font-light">23</span>
          <span className="text-3xl md:text-5xl ml-2 tracking-widest uppercase opacity-80">Gänge</span>
        </h2>
      </div>

      {/* --- ГАЛЕРИЯ СНИМКИ --- */}
      <div className="relative w-full mt-24 md:mt-0 pl-0 md:pl-[30%]">
        {/* Контейнер за скролване */}
        <div 
          ref={scrollContainerRef}
          onClick={handleGalleryClick}
          className={`
            flex overflow-x-auto gap-4 md:gap-10 pb-8 px-4 md:px-0 scrollbar-hide snap-x 
            ${showCursor ? 'cursor-none' : ''} /* Скриваме стандартния курсор на десктоп */
          `}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Скриване на скролбар за Firefox/IE
        >
          {dishes.map((img, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-[85vw] md:w-[45vw] h-[50vh] md:h-[65vh] relative snap-center"
            >
              <img 
                src={img} 
                alt={`Dish ${index + 1}`} 
                className="w-full h-full object-cover rounded-sm shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
              
              {/* МОБИЛЕН БУТОН (Фиксиран върху снимката долу вдясно, само за мобилни) */}
              <div className="md:hidden absolute bottom-6 right-6 z-10">
                <div className="w-14 h-14 rounded-full bg-[#d4a373] flex items-center justify-center shadow-lg animate-pulse">
                   <ArrowRight className="text-[#1a2e2a] w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
          
          {/* Допълнително пространство в края за по-добър скрол */}
          <div className="w-[10vw] flex-shrink-0"></div>
        </div>
      </div>

      {/* --- КЪСТЪМ КУРСОР (САМО ЗА DESKTOP) --- */}
      {/* Рендира се само ако showCursor е true и сме на по-голям екран */}
      <div 
        className={`fixed pointer-events-none z-50 hidden md:flex items-center justify-center w-24 h-24 rounded-full bg-[#d4a373] bg-opacity-90 backdrop-blur-sm shadow-2xl transition-transform duration-100 ease-out transform -translate-x-1/2 -translate-y-1/2 mix-blend-normal`}
        style={{ 
          left: cursorPos.x, 
          top: cursorPos.y,
          opacity: showCursor ? 1 : 0,
          scale: showCursor ? 1 : 0.5
        }}
      >
        {cursorType === 'next' ? (
          <ArrowRight className="text-[#1a2e2a] w-8 h-8" />
        ) : (
          <ArrowLeft className="text-[#1a2e2a] w-8 h-8" />
        )}
      </div>

      {/* --- ТЕКСТОВО ОПИСАНИЕ И БУТОН КЪМ МЕНЮТО --- */}
      <div className="container mx-auto px-6 mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-start-4 md:col-span-6 text-gray-300 font-light leading-relaxed space-y-6">
          <p className="text-lg">
            Bernhard Zimmerl serviert ein fein abgestimmtes 23-Gänge-Menü, das seine Handschrift trägt und Gästen ein ebenso präzises wie überraschendes Geschmackserlebnis bietet.
          </p>
          <p className="text-sm opacity-80">
            "Всяка чиния е разказ, писан преди два века, но прочетен днес с нови сетива."
          </p>

          <div className="pt-4">
            <Link to="/menupage" className="inline-flex items-center gap-3 px-8 py-3 bg-[#3a4e4a] hover:bg-[#d4a373] hover:text-[#1a2e2a] text-[#d4a373] transition-colors duration-300 rounded-sm uppercase tracking-widest text-xs font-bold border border-[#3a4e4a]">
              Menü
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitchenGallery;
