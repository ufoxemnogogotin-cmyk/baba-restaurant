"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutSnippet() {
  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const wordAnimation = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(8px)",
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
    <section className="relative z-40 bg-[#F5F2ED] pt-12 md:pt-20 lg:pt-32 pb-16 lg:pb-64 overflow-hidden">

      <div className="container lg:w-full lg:max-w-none mx-auto px-6 lg:px-0 lg:pl-[320px] lg:pr-[235px] relative">
        {/* HEADER */}
   <div className="mb-6 lg:mb-20 flex flex-col items-center lg:items-start mt-0">
  <h2 className="text-[#212121] uppercase tracking-[0.5em] lg:tracking-[0.8em] text-[10px] font-bold mb-6 lg:mb-8 opacity-40 text-center lg:text-left">

            ЗА НАС
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center lg:items-start">
          {/* TEXT */}
          <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.h3
              variants={titleContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-[#212121] text-3xl lg:text-[5.5vw] font-serif italic leading-[1.05] uppercase tracking-tighter mb-8 lg:mb-12 flex flex-col items-center lg:items-start gap-0 w-full"

            >
              <div className="pr-0 lg:pr-10">
                {"Където миналото".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordAnimation}
                    className="inline-block mx-2 lg:mx-0 lg:mr-4"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              <div className="pr-0 lg:pr-20">
                <motion.span
                  variants={wordAnimation}
                  className="text-[#722F37] lg:ml-[12%] inline-block"
                >
                  намира нов смисъл
                </motion.span>
              </div>
            </motion.h3>

            <div className="max-w-xl mx-auto lg:mx-0 lg:ml-[12%]">
     <p className="text-[#212121]/70 text-base lg:text-[18px] leading-relaxed italic text-center lg:text-left max-w-[320px] mx-auto border-l-0 lg:border-l-2 border-[#722F37]/20 lg:pl-8">


                BABA не е просто дестинация, а преживяване, вдъхновено от
                аристократизма на 19-ти век и смелостта на съвременното изкуство.
              </p>
            </div>
          </div>

          {/* IMAGE + YEAR + BUTTON */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center h-full pt-2 lg:pt-32 w-full">
            {/* 2025 + LOGO */}
            <div className="relative w-full aspect-square max-w-[220px] lg:max-w-[280px] mb-6 lg:mb-12">
              <div
                className="absolute inset-0 rotate-12 scale-150 opacity-10"
                style={{
                  backgroundColor: "#636B2F",
                  WebkitMaskImage: 'url("/logo.svg")',
                  maskImage: 'url("/logo.svg")',
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -translate-y-4 lg:translate-y-0">
                <span className="text-[#722F37] text-6xl lg:text-[7vw] font-serif italic leading-none">
                  2025
                </span>
                <span className="text-[#212121] text-[10px] uppercase tracking-[0.5em] font-bold opacity-40 mt-2">
                  Est.
                </span>
              </div>
            </div>

            {/* BUTTON */}
            <Link
              href="/about"
              className="group relative px-6 py-3 md:px-8 md:py-4 border-2 border-[#722F37]/40 overflow-hidden transition-all duration-700 hover:border-[#722F37] outline-none rounded-none -translate-y-2 lg:translate-y-0"
            >
              <span className="relative z-10 text-[#212121] text-[10px] font-bold uppercase tracking-[0.5em] transition-colors duration-500 group-hover:text-white">
                Вижте историята
              </span>
              <div className="absolute -inset-[1px] bg-[#722F37] translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0 scale-105" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
