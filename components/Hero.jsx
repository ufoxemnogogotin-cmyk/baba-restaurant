"use client";

import React from "react";

export default function Hero() {
  return (
    // overflow-x-hidden тук реже излишното видео вляво и вдясно
    <section className="relative h-screen w-full bg-black overflow-x-hidden">
      {/* 1) ВИДЕО (фон) */}
      <div
        className="absolute top-0 h-screen"
        style={{
          width: "100vw",
          left: "50%",
          marginLeft: "-50vw",
        }}
      >
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Черен тинт (20%) */}
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>

      {/* 2) ТЕКСТ (отгоре на видеото) */}
      <div className="relative z-20 h-full w-full flex items-center justify-center">
        <div className="text-center px-4 flex flex-col items-center -mt-24">
          <h2 className="text-white/60 tracking-[0.5em] uppercase text-[10px] md:text-xs mb-4 font-light animate-pulse italic">
            Artisan Balkan Artfood
          </h2>

          <h1 className="text-white text-5xl md:text-8xl font-extralight tracking-tighter italic leading-[1.1]">
            Вкусът на <br />
            <span className="not-italic font-bold uppercase tracking-tighter">
              традицията
            </span>
          </h1>
        </div>
      </div>

      {/* 3) СКРОЛ ИНДИКАТОР */}
      <div className="absolute bottom-12 left-0 w-full z-20 flex flex-col items-center pointer-events-none">
        <div className="relative w-[1px] h-24 bg-white/10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent animate-scroll-glow" />
        </div>

        <p className="text-white/30 text-[9px] uppercase tracking-[0.6em] mt-6 font-light text-center">
          Scroll <br /> to explore
        </p>
      </div>

      <style jsx>{`
        @keyframes scroll-glow {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        .animate-scroll-glow {
          animation: scroll-glow 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
}
