"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  { id: 1, src: "/loc1.jpg", alt: "Екстериор BABA", span: "md:col-span-2 md:row-span-2", title: "Панорамна Тераса" },
  { id: 3, src: "/loc2.jpg", alt: "Интериор BABA", span: "md:col-span-1 md:row-span-1", title: "Интериор" },
  { id: 4, src: "/loc4.jpg", alt: "Каменен Бар", span: "md:col-span-1 md:row-span-2", title: "Коктейл Бар" },
  { id: 5, src: "/dish2.jpg", alt: "Вкусове BABA", span: "md:col-span-2 md:row-span-1", title: "Вкусове & Цветове" },
  { id: 2, src: "/dish1.jpg", alt: "Специалитети BABA", span: "md:col-span-1 md:row-span-1", title: "Специалитети" },
];

export default function GalleryGrid() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedImg]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImg(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const openModal = (img, index) => {
    setSelectedImg(img);
    setCurrentIndex(index);
  };

  const nextImg = (e) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImg(galleryImages[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImg(galleryImages[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px] lg:auto-rows-[300px] relative z-10">
        {galleryImages.slice(0, 1).map((img) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            onClick={() => openModal(img, 0)}
            className={`relative overflow-hidden group cursor-pointer ${img.span}`}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <p className="text-white font-serif italic text-xl">{img.title}</p>
            </div>
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#722F37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
          </motion.div>
        ))}

        <motion.div 
          className="hidden md:flex items-center justify-center relative overflow-hidden h-full w-full bg-[#212121] group cursor-pointer"
        >
          <Image src="/private-event.jpg" alt="Виртуална разходка" fill className="object-cover opacity-40 grayscale group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-20 text-center px-6">
            <div className="mb-4 flex justify-center text-white/80 group-hover:text-[#722F37] transition-colors duration-500">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                </svg>
            </div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/60 mb-1">Интерактивно</p>
            <h3 className="text-white font-serif italic text-xl uppercase tracking-tighter leading-none">Виртуална <br/> Разходка</h3>
          </div>
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#722F37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
        </motion.div>

        {galleryImages.slice(1).map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index + 3) * 0.1, duration: 0.8 }}
            onClick={() => openModal(img, index + 1)}
            className={`relative overflow-hidden group cursor-pointer ${img.span}`}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <p className="text-white font-serif italic text-xl">{img.title}</p>
            </div>
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#722F37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
          </motion.div>
        ))}

        <motion.div 
          className="hidden md:flex items-center justify-center relative overflow-hidden h-full w-full"
        >
          <div className="relative w-[500px] h-[250px] opacity-20 grayscale brightness-0">
            <Image src="/logo.svg" alt="BABA Grid Logo" fill className="object-contain" />
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[1000] bg-[#212121]/98 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            {/* ЗАТВОРЯНЕ - ГОРЕ ВДЯСНО */}
            <button 
              onClick={() => setSelectedImg(null)} 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/60 hover:text-white transition-all z-[1100] flex items-center gap-2 outline-none"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] hidden md:block">Затвори</span>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="relative flex flex-col items-center justify-center w-full max-w-5xl h-full">
                
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white p-4 pb-20 md:p-6 md:pb-24 shadow-2xl relative w-full max-w-lg lg:max-w-xl cursor-default mx-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F5F2ED]">
                    <Image src={selectedImg.src} alt={selectedImg.alt} fill className="object-cover" priority />
                  </div>
                  
                  <div className="mt-6 text-center px-4">
                    <p className="text-[#212121] font-serif italic text-2xl md:text-3xl leading-none">{selectedImg.title}</p>
                  </div>

                  <div className="absolute bottom-4 md:bottom-8 left-6 md:left-10 right-6 md:right-10 flex justify-start md:justify-between items-center">
                    <div className="relative w-20 h-8 md:w-24 md:h-10 opacity-30 grayscale brightness-0">
                      <Image src="/logo.svg" alt="BABA" fill className="object-contain" />
                    </div>
                    <p className="ml-auto md:ml-0 text-[#212121]/30 text-[11px] md:text-[13px] font-black uppercase tracking-[0.4em]"> 
                      {currentIndex + 1} / {galleryImages.length} 
                    </p>
                  </div>

                  {/* СТРЕЛКИ (КРЪГЧЕТА) - ДОЛУ ПОД СНИМКАТА НА ТЕЛЕФОН */}
                  <div className="absolute -bottom-16 left-0 w-full flex justify-center gap-6 md:hidden">
                    <button onClick={prevImg} className="bg-white/10 backdrop-blur-md border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-all outline-none">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button onClick={nextImg} className="bg-white/10 backdrop-blur-md border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-all outline-none">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                </motion.div>

                {/* ДЕСКТОП СТРЕЛКИ (ОСТАВАТ ОТСТРАНИ) */}
                <button onClick={prevImg} className="hidden md:flex absolute -left-24 bg-white/5 hover:bg-white/10 text-white w-16 h-16 rounded-full items-center justify-center transition-all outline-none">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button onClick={nextImg} className="hidden md:flex absolute -right-24 bg-white/5 hover:bg-white/10 text-white w-16 h-16 rounded-full items-center justify-center transition-all outline-none">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
