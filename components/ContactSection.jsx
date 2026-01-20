"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ContactSection() {
  const searchParams = useSearchParams();
  const isEventRequest = searchParams.get("type") === "event";

  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="bg-[#F5F2ED] min-h-screen pt-32 lg:pt-40 pb-24 px-12 lg:px-24 relative overflow-hidden">
      {/* ФОНОВО ЛОГО С ПАРАЛАКС */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        whileInView={{ opacity: 0.03, scale: 1, rotate: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] aspect-square pointer-events-none"
      >
        <Image src="/logo.svg" alt="" fill className="object-contain" />
      </motion.div>

      <div className="container mx-auto lg:ml-[10%] relative z-10">
        <div className="mb-16">
          <h2 className="text-[#212121] uppercase tracking-[1em] text-[10px] font-bold opacity-40 mb-4 text-center lg:text-left">
            Контакти
          </h2>
          
          {/* ПРОМЯНА ТУК: 
              w-full (пълна ширина на мобилни) 
              lg:w-20 (малка чертичка на десктоп) 
              mx-auto (центрирана на мобилни)
          */}
          <div className="h-[1px] w-full lg:w-20 bg-[#722F37]/30 mx-auto lg:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* ИНФОРМАЦИОННА КОЛОНА */}
          <div className="lg:col-span-4 space-y-12 text-center lg:text-left">
            <div>
              <motion.h1 
                variants={titleContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-[#212121] text-5xl lg:text-[4vw] font-serif italic uppercase tracking-tighter leading-none mb-12"
              >
                <motion.span variants={wordAnimation} className="inline-block mr-4">Свържете</motion.span>
                <motion.span variants={wordAnimation} className="inline-block mr-4">се</motion.span> 
                <br /> 
                <motion.span variants={wordAnimation} className="text-[#722F37] inline-block">с BABA</motion.span>
              </motion.h1>
              
              <div className="space-y-10">
                <div className="space-y-2">
                  <p className="text-[#212121]/40 uppercase tracking-widest text-[9px] font-bold">Локация & Тел</p>
                  <p className="text-[#212121] text-xl font-serif italic">ул. "Артизанска" №12, София</p>
                  <a href="tel:+359888000000" className="text-[#212121] text-xl font-serif italic hover:text-[#722F37] transition-colors block">
                    +359 888 000 000
                  </a>
                </div>

                <div className="space-y-4">
                  <p className="text-[#212121]/40 uppercase tracking-widest text-[11px] font-bold">Бърза връзка</p>
                  <div className="flex gap-8 text-[11px] font-bold tracking-[0.2em] justify-center lg:justify-start">
                    <a href="#" className="relative text-[#722F37] pb-1 group overflow-hidden">
                      INSTAGRAM
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#722F37]/30"></span>
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#722F37] transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0"></span>
                    </a>
                    <a href="#" className="relative text-[#722F37] pb-1 group overflow-hidden">
                      FACEBOOK
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#722F37]/30"></span>
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#722F37] transition-transform duration-500 ease-in-out -translate-x-full group-hover:translate-x-0"></span>
                    </a>
                  </div>
                </div>

                {/* Тази долна линия е border-t, така че тя винаги е w-full (пълна ширина) */}
                <div className="space-y-2 border-t border-[#212121]/10 pt-8">
                  <p className="text-[#212121]/40 uppercase tracking-widest text-[11px] font-bold">Работно време</p>
                  <div className="flex justify-between items-center max-w-[250px] mx-auto lg:mx-0">
                    <span className="text-sm font-serif italic text-[#212121]">Пон - Съб</span>
                    <span className="text-sm font-bold text-[#212121]">12:00 - 00:00</span>
                  </div>
                  <div className="flex justify-between items-center max-w-[250px] mx-auto lg:mx-0">
                    <span className="text-sm font-serif italic text-[#722F37]">Неделя</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-[#722F37]">Private Events Only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ФОРМА ЗА КОНТАКТ */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-8 bg-white p-10 lg:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.04)] relative"
          >
            <h3 className="text-2xl lg:text-3xl font-serif italic text-[#212121] mb-12 text-center lg:text-left">
              {isEventRequest ? "Запитване за частен прием" : "Изпратете ни съобщение"}
            </h3>
            
            <form className="space-y-10 custom-contact-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <input type="text" placeholder="Име" className="w-full bg-transparent border-b border-[#212121]/10 pb-4 outline-none focus:border-[#722F37] transition-colors font-sans text-lg text-[#212121]" />
                <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-[#212121]/10 pb-4 outline-none focus:border-[#722F37] transition-colors font-sans text-lg text-[#212121]" />
              </div>
              <textarea placeholder="Вашето съобщение..." rows="4" className="w-full bg-transparent border-b border-[#212121]/10 pb-4 outline-none focus:border-[#722F37] transition-colors font-sans text-lg resize-none text-[#212121]"></textarea>

              <div className="flex justify-center lg:justify-end pt-4">
                <button className="relative overflow-hidden group px-14 py-5 bg-[#212121] transition-colors duration-500">
                  <span className="absolute inset-0 w-full h-full bg-[#722F37] transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0"></span>
                  <span className="relative z-10 text-white uppercase font-bold tracking-[0.2em] text-[11px]">
                    {isEventRequest ? "Изпрати запитване" : "Изпрати съобщение"}
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .custom-contact-form input::placeholder,
        .custom-contact-form textarea::placeholder {
          color: #722F37 !important;
          opacity: 0.7;
          font-style: normal !important;
          font-family: ui-sans-serif, system-ui, sans-serif !important;
        }
      `}</style>
    </section>
  );
}
