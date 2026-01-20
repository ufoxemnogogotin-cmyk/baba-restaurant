"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

const dishes = [
  { id: 1, img: "/dish1.jpg", w: 720, h: 480 }, // Първата снимка е хоризонтална
  { id: 2, img: "/dish2.jpg", w: 420, h: 600 }, // Останалите са вертикални
  { id: 3, img: "/dish3.jpg", w: 420, h: 600 },
  { id: 4, img: "/private-event.jpg", w: 420, h: 600 },
];

export default function KitchenGallery() {
  const ACCENT = "#722f37";
  const TEXT = "#212121";
  const BG = "#f5f2ed";

  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ backgroundColor: BG }}>
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">

        {/* LOGO / TITLE - По-наляво и по-надолу за застъпване */}
        <div className="relative z-20 mb-[-80px] md:mb-[-140px] ml-0 md:ml-10 pointer-events-none">
          <h2 style={{ fontFamily: "serif", color: ACCENT }} className="leading-none">
            <span className="block text-[120px] md:text-[200px] font-light">23</span>
            <span className="block -mt-6 md:-mt-10 text-[32px] md:text-[54px] tracking-[0.2em]">
              GÄNGE
            </span>
          </h2>
        </div>

        {/* SLIDER - Подравнен в долната част */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            slidesPerView="auto"
            spaceBetween={40}
            grabCursor={true}
            navigation={{ nextEl: ".next-btn" }}
            className="!overflow-visible"
          >
            {dishes.map((d, index) => (
              <SwiperSlide key={d.id} className="!w-auto flex items-end">
                <div
                  className="relative bg-white shadow-2xl overflow-hidden"
                  style={{ 
                    width: typeof window !== 'undefined' && window.innerWidth < 768 ? '80vw' : d.w, 
                    height: typeof window !== 'undefined' && window.innerWidth < 768 ? '50vh' : d.h 
                  }}
                >
                  <Image
                    src={d.img}
                    alt="Dish"
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* NEXT BUTTON - Цвят #722f37 */}
          <button
            className="next-btn absolute right-0 md:right-10 bottom-10 z-30 
                       w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center 
                       shadow-2xl transition hover:scale-110 active:scale-95"
            style={{ backgroundColor: ACCENT }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:w-10 md:h-10"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        {/* TEXT BLOCK */}
        <div className="mt-24 md:mt-32 max-w-xl">
          <p className="text-lg md:text-xl leading-relaxed font-light" style={{ color: TEXT }}>
            Bernhard Zimmerl serviert ein fein abgestimmtes 23-Gänge-Menü, das
            seine Handschrift trägt und Gästen ein ebenso präzises wie
            überрасhendes Geschmackserlebnis bietet.
          </p>

          <button
            className="mt-10 inline-flex items-center gap-4 border-b-2 pb-2 tracking-[0.25em] font-bold text-sm uppercase transition-opacity hover:opacity-70"
            style={{ color: TEXT, borderColor: ACCENT }}
          >
            MENÜ <span style={{ color: ACCENT }} className="text-xl">→</span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        .swiper-slide {
          height: 700px; /* Осигурява място за вертикалните снимки */
          display: flex;
          align-items: flex-end; /* Подравнява хоризонталните снимки долу */
        }
      `}</style>
    </section>
  );
}
