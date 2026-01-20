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
    if (selectedImg) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedImg]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setSelectedImg(null); };
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
        {galleryImages.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            onClick={() => openModal(img, index)}
            className={`relative overflow-hidden group cursor-pointer ${img.id === 1 ? "md:col-span-2 md:row-span-2" : img.span}`}
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
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[1000] bg-[#212121]/98 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* КЛАСИЧЕСКИ Х БУТОН ГОРЕ ВДЯСНО */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-all z-[1100] p-2"
            >
              <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="relative flex items-center justify-center w-full max-w-lg">
              {/* DESKTOP ARROWS */}
              <button onClick={prevImg} className="hidden md:block absolute -left-24 text-white/70 text-6xl font-light">←</button>
              <button onClick={nextImg} className="hidden md:block absolute -right-24 text-white/70 text-6xl font-light">→</button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-4 pb-20 md:pb-24 shadow-2xl relative w-full cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F5F2ED]">
                  <Image src={selectedImg.src} alt={selectedImg.alt} fill className="object-cover" priority />
                </div>

                <div className="mt-4 text-center px-2">
                  <p className="text-[#212121] font-serif italic text-2xl leading-tight">{selectedImg.title}</p>
                </div>

                {/* КОНТЕЙНЕР ПОД РАМКАТА ЗА МОБИЛНИ */}
                <div className="absolute -bottom-16 left-0 right-0 flex justify-between items-center px-2 md:px-10 md:bottom-8">
                  {/* ЛОГО - МАКСИМАЛНО ВЛЯВО */}
                  <div className="relative w-20 h-8 opacity-40 grayscale brightness-0">
                    <Image src="/logo.svg" alt="BABA" fill className="object-contain object-left" />
                  </div>

                  {/* СТРЕЛКИ - ЧЕРВЕНИ КРЪГЧЕТА С БЕЛИ СТРЕЛКИ */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevImg}
                      className="w-10 h-10 rounded-full bg-[#722F37] flex items-center justify-center text-white active:scale-90 transition shadow-lg"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImg}
                      className="w-10 h-10 rounded-full bg-[#722F37] flex items-center justify-center text-white active:scale-90 transition shadow-lg"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* БРОЯЧ - ЦЕНТРИРАН ПОД ТЕКСТА ЗА МОБИЛНИ */}
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 md:translate-x-0 md:static">
                   <p className="text-white/40 md:text-[#212121]/30 text-[11px] font-black uppercase tracking-[0.4em]">
                    {currentIndex + 1} / {galleryImages.length}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
