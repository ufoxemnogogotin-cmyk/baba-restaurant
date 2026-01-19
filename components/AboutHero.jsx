"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Варианти за анимация на контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  // Варианти за анимация на отделните думи
  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    // ПРОМЯНА: min-h-screen за да заеме целия екран на телефона
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-24">
      
      {/* Background Image с Паралакс */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        <Image 
          src="/about-hero.jpg" 
          alt="BABA Interior" 
          fill 
          className="object-cover scale-110"
          priority
        />
      </div>
      
      <div className="relative z-10 text-center flex flex-col items-center justify-center h-full pb-10 md:pb-0">
        {/* Малкото заглавие */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[#212121]/40 uppercase tracking-[0.5em] md:tracking-[1em] text-[10px] md:text-[12px] font-bold mb-6 md:mb-8"
        >
          Нашето Наследство
        </motion.h2>

        {/* Основното заглавие */}
        <motion.h1 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-[#212121] text-5xl md:text-[9vw] font-serif italic leading-[1.2] md:leading-none uppercase tracking-tighter w-full"
        >
          {/* ПЪРВИ РЕД: ИСТОРИЯ */}
          <div className="md:inline-block">
            {"История,".split(" ").map((word, i) => (
              <motion.span 
                key={i} 
                variants={childVariants} 
                // ПРОМЯНА: block на мобилно (за да е сам на ред), inline-block на десктоп
                className="block md:inline-block md:mr-4 mb-2 md:mb-0"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* ВТОРИ И ТРЕТИ РЕД: КОЯТО СЕ ... ПРЕЖИВЯВА */}
          <div className="md:inline-block md:mt-2">
            {"която се преживява".split(" ").map((word, i) => {
               // Логика за подредба:
               // "преживява" -> червен, нов ред, с голямо отстояние на десктоп
               // останалите -> нормални, един до друг
               const isLastWord = word === "преживява";
               
               return (
                <motion.span 
                  key={i} 
                  variants={childVariants} 
                  className={`
                    ${isLastWord 
                      ? "block md:inline-block text-[#722F37] mt-2 md:mt-0 md:ml-24" // Мобилно: Нов ред. Десктоп: Отместване.
                      : "inline-block mx-1 md:mx-0 md:mr-4" // Мобилно: Малко разстояние между думите.
                    }
                  `}
                >
                  {word}
                </motion.span>
              );
            })}
          </div>
        </motion.h1>
      </div>
    </section>
  );
}