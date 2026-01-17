"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const locations = [
  { id: 1, title: "ТЕРАСАТА", desc: "Емблематична панорамна тераса, разположена на самия покрив на Народния театър.", img: "/loc1.jpg" },
  { id: 2, title: "ПОКРИВА", desc: "Усетете ритъма на София от птичи поглед, където историческата архитектура се среща с модерния дух на града.", img: "/loc2.jpg" },
  { id: 3, title: "БАРА", desc: "Нашият каменен бар съчетава суровата красота на естествените материали с изтънчена селекция от авторски коктейли.", img: "/loc3.jpg" },
  { id: 4, title: "ДЕТАЙЛ", desc: "Интериорът е проектиран да разказва истории чрез всеки детайл – от ръчно обработените повърхности до художественото осветление.", img: "/loc4.jpg" },
  { id: 5, title: "360 ГЛЕДКА", desc: "Потопете се напълно в нашата атмосфера чрез иновативното 360-градусово виртуално изживяване, което ще ви пренесе в нашия свят.", img: "/logo.svg" },
];

export default function LocationSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredNavIndex, setHoveredNavIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;
      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIndex = Math.min(Math.floor(scrollProgress * locations.length), locations.length - 1);
  const logoCircleProgress = scrollProgress > 0.8 ? (scrollProgress - 0.8) / 0.18 : 0;

  const scrollToIndex = (index) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const windowHeight = window.innerHeight;
    const stepHeight = (container.offsetHeight - windowHeight) / (locations.length - 0.5);
    
    window.scrollTo({
      top: container.offsetTop + (index * stepHeight) + (windowHeight * 0.45),
      behavior: "smooth"
    });
  };

  return (
    <section ref={containerRef} className="relative z-40 bg-[#F5F2ED] h-[850vh] pt-[25vh] pb-24">
      
      {/* BACKGROUND TEXT - ЦВЯТ #BAC095 */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        <h2 
          className="text-[28vw] font-serif italic text-[#BAC095]/10 whitespace-nowrap"
          style={{ transform: `translateX(${(0.5 - scrollProgress) * 30}%)` }}
        >
          LOCATION
        </h2>
      </div>

      <div className="sticky top-0 h-screen w-full mt-[-100vh] flex items-center">
        <div className="container mx-auto px-12 lg:px-24 w-full h-full relative flex items-center">
          
          <div className="flex items-center justify-end w-full gap-16 lg:gap-32">
            
            {/* TEXT SIDE */}
            <div className="w-[35%] z-20">
              <h2 className="text-[#212121] uppercase tracking-[0.8em] text-[10px] font-bold mb-16 opacity-40">Преживяването</h2>
              <div className="relative h-[450px]">
                {locations.map((loc, i) => (
                  <div key={i} className={`absolute top-0 left-0 transition-all duration-700 ${activeIndex === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                    <h3 className="text-[#212121] text-6xl lg:text-[5.5vw] font-serif italic leading-[1] tracking-tighter mb-12 uppercase">{loc.title}</h3>
                    <p className="text-[#212121]/60 text-[16px] italic leading-relaxed border-l border-[#722F37]/20 pl-10 mb-12">{loc.desc}</p>
                    
                    {/* КОРЕГИРАН БУТОН С border-2 И БЕЗ GAP */}
                    {i === 4 && (
                      <button className="group relative px-10 py-5 border-2 border-[#722F37]/40 overflow-hidden transition-all duration-700 hover:border-[#722F37] outline-none mt-8 rounded-none">
                        <span className="relative z-10 text-[#212121] text-[11px] font-bold uppercase tracking-[0.5em] transition-colors duration-500 group-hover:text-white">
                          Разгледайте 360°
                        </span>
                        {/* ФИКС ЗА GAP: -inset-[1px] и scale-105 гарантират пълно покритие */}
                        <div className="absolute -inset-[1px] bg-[#722F37] translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0 scale-105"></div>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* MEDIA SIDE */}
            <div className="w-[52%] relative h-[80vh] bg-[#e5e2dd] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              {locations.map((loc, index) => (
                <div key={loc.id} className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${activeIndex === index ? 'translate-y-0 opacity-100' : (index < activeIndex ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0')}`} style={{ zIndex: activeIndex === index ? 20 : 10 }}>
                  <div className="relative w-full h-full flex items-center justify-center">
                    {index === 4 ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#F5F2ED] scale-110">
                        <div className="relative w-72 h-72 z-10">
                          <Image src="/logo.svg" alt="Logo" fill className="object-contain brightness-0 opacity-25" />
                        </div>
                        <svg className="absolute w-[500px] h-[500px] -rotate-90 z-20">
                          <circle cx="250" cy="250" r="230" fill="none" stroke="#722F37" strokeWidth="1" strokeDasharray="1445" strokeDashoffset={1445 - (1445 * Math.min(logoCircleProgress, 1))} className="transition-all duration-150 ease-linear" />
                        </svg>
                      </div>
                    ) : (
                      <Image src={loc.img} alt={loc.title} fill className="object-cover scale-105" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INDICATOR */}
          <div className="absolute right-[-80px] lg:right-[-160px] top-1/2 -translate-y-1/2 flex flex-col items-end gap-10 z-[100]">
            <div className="flex flex-col gap-10">
              {locations.map((loc, i) => (
                <button 
                  key={i} 
                  onClick={() => scrollToIndex(i)}
                  onMouseEnter={() => setHoveredNavIndex(i)}
                  onMouseLeave={() => setHoveredNavIndex(null)}
                  className="group flex items-center justify-end gap-6 outline-none"
                >
                  <span className={`text-[9px] uppercase font-bold tracking-[0.3em] transition-all duration-500 whitespace-nowrap ${activeIndex === i || hoveredNavIndex === i ? 'opacity-100 text-[#722F37] -translate-x-2' : 'opacity-0 translate-x-6'}`}>
                    {loc.title}
                  </span>
                  <div className={`h-[1.5px] transition-all duration-700 ${activeIndex === i ? 'w-14 bg-[#722F37]' : 'w-4 bg-[#212121]/20 group-hover:w-10 group-hover:bg-[#722F37]/40'}`}></div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}