"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  { id: 1, src: "/loc1.jpg", alt: "Екстериор BABA", title: "Панорамна Тераса" },
  { id: 2, src: "/loc2.jpg", alt: "Интериор BABA", title: "Интериор" },
  { id: 3, src: "/loc4.jpg", alt: "Каменен Бар", title: "Коктейл Бар" },
  { id: 4, src: "/dish2.jpg", alt: "Вкусове BABA", title: "Вкусове & Цветове" },
  { id: 5, src: "/dish1.jpg", alt: "Специалитети BABA", title: "Специалитети" },
];

export default function GalleryGrid() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = selectedImg ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [selectedImg]);

  const openModal = (img, index) => {
    setSelectedImg(img);
    setCurrentIndex(index);
  };

  const nextImg = (e) => {
    e.stopPropagation();
    const next = (currentIndex + 1) % galleryImages.length;
    setSelectedImg(galleryImages[next]);
    setCurrentIndex(next);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    const prev = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImg(galleryImages[prev]);
    setCurrentIndex(prev);
  };

  return (
    <section className="relative bg-[#F5F2ED] py-16 md:py-32 overflow-hidden">

      {/* ================= MOBILE CARDS ================= */}
      <div
        ref={scrollRef}
        className="md:hidden flex gap-6 overflow-x-auto px-6 snap-x snap-mandatory scrollbar-hide"
      >
        {galleryImages.map((img, index) => (
          <motion.div
            key={img.id}
            onClick={() => openModal(img, index)}
            className="snap-start shrink-0 w-[80vw] h-[55vw] relative cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* ================= DESKTOP GRID ================= */}
      <div className="hidden md:grid grid-cols-3 gap-4 auto-rows-[300px] px-24">
        {galleryImages.map((img, index) => (
          <motion.div
            key={img.id}
            onClick={() => openModal(img, index)}
            className="relative overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <p className="text-white font-serif italic text-xl">
                {img.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <div className="relative max-w-xl w-full">
              <button
                onClick={prevImg}
                className="absolute -left-12 top-1/2 text-white text-5xl hidden md:block"
              >
                ←
              </button>

              <button
                onClick={nextImg}
                className="absolute -right-12 top-1/2 text-white text-5xl hidden md:block"
              >
                →
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={selectedImg.src}
                    alt={selectedImg.alt}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="mt-4 text-center font-serif italic text-2xl">
                  {selectedImg.title}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
