"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Подредба: Виртуалната разходка заменя Специалитети (id 2) в грида
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

  // Забрана на скрола при отворен модал
  useEffect(() => {
    if (selectedImg) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
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
        {/* ПЪРВА СНИМКА (ПАНОРАМА) */}
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
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <p className="text-white font-serif italic text-xl">{img.title}</p>
            </div>
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#722F37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
          </motion.div>
        ))}

        {/* ВИРТУАЛНА РАЗХОДКА (НА МЯСТОТО НА СПЕЦИАЛИТЕТИ) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="hidden md:flex items-center justify-center relative overflow-hidden h-full w-full bg-[#212121] group cursor-pointer"
        >
          <Image
            src="/private-event.jpg"
            alt="Виртуална разходка"
            fill
            className="object-cover opacity-40 grayscale group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="relative z-20 text-center px-6">
            <div className="mb-4 flex justify-center text-white/80 group-hover:text-[#722F37] transition-colors duration-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
            </div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/60 mb-1">Интерактивно</p>
            <h3 className="text-white font-serif italic text-xl uppercase tracking-tighter leading-none">
              Виртуална <br /> Разходка
            </h3>
          </div>
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#722F37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
        </motion.div>

        {/* ОСТАНАЛИТЕ СНИМКИ ОТ ГАЛЕРИЯТА */}
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
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <p className="text-white font-serif italic text-xl">{img.title}</p>
            </div>
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#722F37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
          </motion.div>
        ))}

        {/* МАКСИМАЛНО УВЕЛИЧЕНО И СИВО ЛОГО */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="hidden md:flex items-center justify-center relative overflow-hidden h-full w-full"
        >
          <div className="relative w-[500px] h-[250px] opacity-20 grayscale brightness-0 transition-transform duration-700 hover:scale-110">
            <Image src="/logo.svg" alt="BABA Grid Logo" fill className="object-contain" />
          </div>
        </motion.div>
      </div>

      {/* МОДАЛ / LIGHTBOX */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[1000] bg-[#212121]/98 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            {/* CLOSE (X) - горе вдясно, различни позиции за mobile/desktop */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImg(null);
              }}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/40 hover:text-white transition-all z-[1100] p-3 md:p-4 outline-none"
              aria-label="Затвори"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="relative flex items-center justify-center w-full max-w-5xl h-full">
              {/* DESKTOP ARROWS (остават си отстрани) */}
              <button
                onClick={prevImg}
                className="hidden md:block absolute left-0 md:-left-24 text-white/70 hover:text-white transition-all z-[1050] p-4 text-6xl font-light outline-none"
                aria-label="Предишна"
              >
                ←
              </button>
              <button
                onClick={nextImg}
                className="hidden md:block absolute right-0 md:-right-24 text-white/70 hover:text-white transition-all z-[1050] p-4 text-6xl font-light outline-none"
                aria-label="Следваща"
              >
                →
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-4 pb-16 md:p-6 md:pb-24 shadow-2xl relative w-full max-w-lg lg:max-w-xl cursor-default mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F5F2ED]">
                  <Image src={selectedImg.src} alt={selectedImg.alt} fill className="object-cover" priority />
                </div>

                <div className="mt-6 text-center px-4">
                  <p className="text-[#212121] font-serif italic text-2xl md:text-3xl leading-none">
                    {selectedImg.title}
                  </p>
                </div>

                <div className="absolute bottom-4 md:bottom-8 left-6 md:left-10 right-6 md:right-10 flex justify-between items-center">
                  <div className="relative w-24 h-10 opacity-30 grayscale brightness-0">
                    <Image src="/logo.svg" alt="BABA" fill className="object-contain" />
                  </div>
                  <p className="text-[#212121]/30 text-[13px] font-black uppercase tracking-[0.4em]">
                    {currentIndex + 1} / {galleryImages.length}
                  </p>
                </div>

                {/* MOBILE ARROWS - долу вдясно, две кръгчета */}
                <div className="md:hidden absolute bottom-4 right-4 flex items-center gap-3 z-[1200]">
                  <button
                    onClick={prevImg}
                    className="w-12 h-12 rounded-full bg-[#212121]/10 border border-[#212121]/15 flex items-center justify-center text-[#212121]/70 active:scale-95 transition"
                    aria-label="Предишна"
                  >
                    <span className="text-2xl leading-none">←</span>
                  </button>
                  <button
                    onClick={nextImg}
                    className="w-12 h-12 rounded-full bg-[#212121]/10 border border-[#212121]/15 flex items-center justify-center text-[#212121]/70 active:scale-95 transition"
                    aria-label="Следваща"
                  >
                    <span className="text-2xl leading-none">→</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
