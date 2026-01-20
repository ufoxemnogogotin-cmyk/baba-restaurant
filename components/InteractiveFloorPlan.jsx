"use client";
import { useState, useRef } from "react";
import Image from "next/image";

const zones = [
  { 
    id: "terrace", 
    title: "Панорамна Тераса", 
    desc: "Най-желаните места с изглед към Народния театър.",
    link: "https://booking.com/terrace",
    images: ["/loc1.jpg", "/loc2.jpg", "/loc4.jpg"],
    alt: "Изглед от панорамната тераса на ресторант BABA към София"
  },
  { 
    id: "salon", 
    title: "Основен Салон", 
    desc: "Аристократична атмосфера сред автентични детайли.",
    link: "https://booking.com/salon",
    images: ["/loc4.jpg", "/loc3.jpg"],
    alt: "Интериор на основния аристократичен салон в BABA"
  },
  { 
    id: "bar", 
    title: "Каменен Бар", 
    desc: "Близо до ритъма на коктейлите и суровата естетика.",
    link: "https://booking.com/bar",
    images: ["/loc3.jpg", "/loc2.jpg"],
    alt: "Модерен каменен бар за авторски коктейли в BABA"
  }
];

export default function InteractiveFloorPlan() {
  const [activeZone, setActiveZone] = useState(zones[0]);
  const [imgIndex, setImgIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, side: 'right', isVisible: false });
  const galleryRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!galleryRef.current) return;
    const rect = galleryRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const side = x < rect.width / 2 ? 'left' : 'right';
    setMousePos({ x, y, side, isVisible: true });
  };

  const handleImageChange = () => {
    if (mousePos.side === 'right') {
      setImgIndex((prev) => (prev + 1) % activeZone.images.length);
    } else {
      setImgIndex((prev) => (prev - 1 + activeZone.images.length) % activeZone.images.length);
    }
  };

  const handleKeyDown = (e, zone) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveZone(zone);
      setImgIndex(0);
    }
  };

  return (
    /* КОРЕКЦИЯТА Е ТУК (Ред 82): 
       Смених lg:mt-[-35vh] с lg:mt-0, за да свалим секцията надолу на десктоп.
       mt-0 запазва оригиналния вид на мобилни устройства.
    */
    <section className="bg-[#F5F2ED] min-h-[60vh] flex items-start px-6 lg:px-24 mt-0 lg:mt-0 py-12 lg:py-0 relative z-20"> 
      <div className="container mx-auto lg:ml-[10%]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* ЛЯВА СТРАНА: КОНТЕНТ (Текст и бутони) */}
          <div className="lg:col-span-4 space-y-10 pt-2 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            <nav className="flex flex-col gap-4 w-full" aria-label="Избор на зона за резервация">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  onMouseEnter={() => { setActiveZone(zone); setImgIndex(0); }}
                  onFocus={() => { setActiveZone(zone); setImgIndex(0); }}
                  onKeyDown={(e) => handleKeyDown(e, zone)}
                  className={`group py-5 transition-all duration-500 outline-none focus:ring-1 focus:ring-[#722F37]/20
                    text-center lg:text-left 
                    border-l-0 lg:border-l-2 
                    pl-0 lg:pl-8 
                    ${activeZone.id === zone.id ? "border-[#722F37] bg-[#212121]/5" : "border-[#212121]/10 opacity-30"}
                  `}
                  aria-pressed={activeZone.id === zone.id}
                >
                  <h3 className="text-2xl font-serif italic uppercase text-[#212121] mb-1 tracking-tighter leading-none">
                    {zone.title}
                  </h3>
                  <p className="text-[13px] text-[#212121]/60 italic max-w-xs leading-relaxed mt-2 mx-auto lg:mx-0">
                    {zone.desc}
                  </p>
                </button>
              ))}
            </nav>

            {/* КОНТЕЙНЕР НА БУТОНА ЗА РЕЗЕРВАЦИЯ */}
            <div className="pt-4 w-full flex justify-center lg:justify-start">
              <a 
                href={activeZone.link} 
                target="_blank" 
                rel="noopener noreferrer"
                title={`Резервирайте място в ${activeZone.title}`}
                className="inline-block outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-4"
              >
                <button className="bg-[#722F37] text-white px-14 py-5 rounded-none uppercase font-bold tracking-[0.2em] text-[11px] hover:bg-[#212121] transition-all duration-500 shadow-xl pointer-events-none">
                  Продължи с {activeZone.title}
                </button>
              </a>
            </div>
          </div>

          {/* ДЯСНА СТРАНА: ГАЛЕРИЯ (Снимки) */}
          <div className="lg:col-span-8 relative order-1 lg:order-2 w-full">
            <div 
              ref={galleryRef}
              role="button"
              tabIndex="0"
              aria-label="Разгледайте снимки на зоната. Кликнете за следваща снимка."
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setMousePos(prev => ({ ...prev, isVisible: true }))}
              onMouseLeave={() => setMousePos(prev => ({ ...prev, isVisible: false }))}
              onClick={handleImageChange}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleImageChange()}
              className="relative aspect-[16/9] bg-[#212121]/5 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] cursor-none group outline-none focus:ring-2 focus:ring-[#722F37]"
            >
              <Image 
                src={activeZone.images[imgIndex]} 
                alt={activeZone.alt}
                fill 
                priority={activeZone.id === "terrace"}
                className="object-cover transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100" 
                key={`${activeZone.id}-${imgIndex}`}
              />

              {/* ИНТЕРАКТИВЕН КУРСОР - скрит на тъч (мобилни) */}
              <div 
                className={`pointer-events-none absolute z-50 hidden lg:flex items-center justify-center w-16 h-16 rounded-full border border-white/40 bg-black/10 backdrop-blur-md text-white text-xl transition-opacity duration-300 ${
                  mousePos.isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ left: mousePos.x - 32, top: mousePos.y - 32 }}
              >
                <span aria-hidden="true">{mousePos.side === 'left' ? '←' : '→'}</span>
              </div>

              {/* ИНДИКАТОР ЗА СНИМКИ */}
              <div className="absolute bottom-6 right-8 flex gap-2" aria-hidden="true">
                {activeZone.images.map((_, i) => (
                  <div key={i} className={`h-[1px] transition-all duration-700 ${i === imgIndex ? 'w-8 bg-white' : 'w-3 bg-white/30'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
