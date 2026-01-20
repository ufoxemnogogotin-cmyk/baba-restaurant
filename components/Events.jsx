"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const events = [
  { 
    id: "01", 
    type: "Музика на живо", 
    title: "Джаз на покрива", 
    time: "20:00 — 23:00", 
    date: "24.01", 
    img: "/loc3.jpg" 
  },
  { 
    id: "02", 
    type: "Дегустация", 
    title: "Селекция Балкански вина", 
    time: "19:00 — 22:00", 
    date: "07.02", 
    img: "/dish2.jpg" 
  },
  { 
    id: "03", 
    type: "Арт вечер", 
    title: "Платно и Коктейли", 
    time: "18:30 — 21:30", 
    date: "21.02", 
    img: "/loc1.jpg" 
  },
  { 
    id: "04", 
    type: "Кулинарен клас", 
    title: "Изкуството на подправките", 
    time: "14:00 — 17:00", 
    date: "05.03", 
    img: "/dish3.jpg" 
  }
];

const revealVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Events() {
  return (
    <section className="bg-[#F5F2ED] py-24 lg:py-40 overflow-hidden">
      <div className="container mx-auto px-12 lg:px-24">
        
        {/* ЗАГЛАВНА СЕКЦИЯ */}
        <div className="flex flex-col items-center text-center lg:flex-row lg:justify-between lg:items-baseline lg:text-left mb-32 border-b border-[#212121]/10 pb-4 lg:pb-12">
          
          <div className="overflow-visible lg:pr-12">
            <motion.h1 
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              className="text-[#212121] text-6xl lg:text-[7vw] font-serif italic uppercase tracking-tighter flex flex-col items-center lg:flex-row lg:items-baseline leading-none"
            >
              <span>Програма</span> 
              
              <div className="flex items-baseline -mt-2 self-end lg:mt-0 lg:ml-6 lg:self-auto">
                <span className="text-[#212121]/20 mx-2 lg:mx-4 font-light not-italic text-2xl lg:text-[5vw]">/</span> 
                <span className="text-[#722F37] text-2xl lg:text-[4vw]">2025</span>
              </div>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 }}
            className="text-[#212121] uppercase tracking-[0.4em] text-[10px] font-bold mt-14 lg:mt-0"
          >
            Избрани преживявания
          </motion.p>
        </div>

        {/* СПИСЪК СЪБИТИЯ */}
        <div className="space-y-48 mb-40">
          {events.map((event, index) => {
            const isFirst = index === 0;
            return (
              <div key={event.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-32`}>
                
                {/* ИЗОБРАЖЕНИЕ */}
                <motion.div 
                  className="w-full lg:w-[45%] relative aspect-[3/4] overflow-hidden bg-[#E8E4DF]"
                  initial={{ filter: "grayscale(100%)", opacity: 0 }}
                  animate={isFirst ? { filter: "grayscale(0%)", opacity: 1 } : {}}
                  whileInView={!isFirst ? { filter: "grayscale(0%)", opacity: 1 } : {}}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.2 }}
                >
                  <Image 
                    src={event.img} 
                    alt={event.title} 
                    fill 
                    priority={isFirst} 
                    className="object-cover"
                  />
                </motion.div>

                {/* ТЕКСТОВА ЧАСТ */}
                {/* ПРОМЕНИ ТУК:
                   1. items-center text-center (за мобилни)
                   2. lg:items-start lg:text-left (връщане за десктоп)
                   3. px-4 (центриран padding за мобилни), lg:pr-4 lg:pl-0 (за десктоп)
                */}
                <div className="w-full lg:w-[45%] flex flex-col items-center text-center lg:items-start lg:text-left px-4 lg:pr-4 lg:pl-0">
                  <span className="text-[#722F37] text-[10px] font-bold uppercase tracking-[0.6em] mb-6 block">
                    {event.type}
                  </span>
                  
                  {/* Заглавие: премахваме pr-10 на мобилни, за да е центрирано */}
                  <div className="overflow-visible mb-8 pr-0 lg:pr-10">
                    <motion.h2 
                      variants={revealVariants}
                      initial="hidden"
                      animate={isFirst ? "visible" : ""}
                      whileInView={!isFirst ? "visible" : ""}
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-[#212121] text-5xl lg:text-[4.5vw] font-serif italic leading-[1.1] uppercase tracking-tighter"
                    >
                      {event.title}
                    </motion.h2>
                  </div>

                  {/* Дата/Час: justify-center на мобилни */}
                  <div className="flex items-center justify-center lg:justify-start gap-8 text-[#212121]/50 text-sm font-serif italic mb-10">
                    <span>{event.date}</span>
                    <span className="w-px h-4 bg-[#212121]/20"></span>
                    <span>{event.time}</span>
                  </div>

                  {/* БУТОН ЗА РЕЗЕРВАЦИЯ: Вече е центриран заради flex-col items-center на родителя */}
                  <button className="group relative px-10 py-4 border-2 border-[#722F37]/40 overflow-hidden rounded-none flex items-center justify-center outline-none mb-10 transition-all duration-700 hover:border-[#722F37]">
                    <span className="relative z-10 text-[#212121] text-[10px] font-bold uppercase tracking-[0.4em] transition-colors duration-500 group-hover:text-white">
                      Резервирай място
                    </span>
                    <div className="absolute -inset-[1px] bg-[#722F37] translate-y-[101%] transition-transform duration-700 ease-out group-hover:translate-y-0 scale-105"></div>
                  </button>

                  <div className="h-[1px] w-full bg-[#212121]/10"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ЧАСТНИ СЪБИТИЯ CTA */}
        <div className="bg-[#212121] p-16 lg:p-32 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
            <Image src="/logo.svg" alt="" fill className="object-contain invert scale-125 -rotate-12" />
          </div>

          <div className="relative z-10">
            <h3 className="text-[#BAC095] uppercase tracking-[0.8em] text-[10px] font-bold mb-10">
              Лично събитие
            </h3>
            
            <div className="flex flex-col gap-2 mb-16 overflow-visible px-4">
              <motion.p 
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-white text-3xl lg:text-5xl font-serif italic uppercase tracking-tighter"
              >
                На ваше разположение
              </motion.p>
              <motion.p 
                variants={revealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-[#722F37] text-3xl lg:text-5xl font-serif italic uppercase tracking-tighter"
              >
                Всяка неделя
              </motion.p>
            </div>
            
            {/* БУТОН ЗА НЕДЕЛЯ */}
            <Link 
              href="/contact" 
              className="group relative px-16 py-6 border-2 border-[#722F37]/40 overflow-hidden rounded-none flex items-center justify-center outline-none transition-all duration-700 hover:border-[#722F37]"
            >
              <span className="relative z-10 text-white text-[11px] font-bold uppercase tracking-[0.5em] transition-colors duration-500 group-hover:text-white">
                Запитване за неделя
              </span>
              <div className="absolute -inset-[1px] bg-[#722F37] translate-y-[101%] transition-transform duration-700 ease-out group-hover:translate-y-0 scale-105"></div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
