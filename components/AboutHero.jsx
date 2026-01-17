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
        staggerChildren: 0.1, // Време между появата на всяка дума
        delayChildren: 0.3,
      },
    },
  };

  // Варианти за анимация на отделните думи
  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(10px)" // Добавяме леко размазване за по-арт ефект
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier за елегантност
      },
    },
  };

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-12 lg:px-24">
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
      
      <div className="relative z-10 text-center space-y-8">
        {/* Малкото заглавие - плавно изплуване */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[#212121]/40 uppercase tracking-[1em] text-[12px] font-bold"
        >
          Нашето Наследство
        </motion.h2>

        {/* Основното заглавие с Reveal ефект */}
        <motion.h1 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-[#212121] text-6xl md:text-[9vw] font-serif italic leading-none uppercase tracking-tighter"
        >
          {/* Разделяме текста на редове и думи за анимацията */}
          <div className="overflow-hidden">
            {"История,".split(" ").map((word, i) => (
              <motion.span key={i} variants={childVariants} className="inline-block mr-4">
                {word}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden mt-2">
            {"която се преживява".split(" ").map((word, i) => (
              <motion.span 
                key={i} 
                variants={childVariants} 
                className={`inline-block ${word === "преживява" ? "text-[#722F37] ml-4 md:ml-24" : "mr-4"}`}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.h1>
      </div>
    </section>
  );
}