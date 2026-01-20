"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories = ["ХРАНА", "ВИНА", "КОКТЕЙЛИ"];

const menuData = {
  "ХРАНА": [
    { id: 1, name: "Шопска салата BABA", desc: "Градински домати, печена капия, отлежало сирене", price: "16", alt: "Традиционна шопска салата с пресни зеленчуци" },
    { id: 2, name: "Патешки дроб", desc: "Дюля, червено вино, балкански подправки", price: "28", alt: "Деликатесен патешки дроб със сос от червено вино" },
    { id: 3, name: "Агнешко в пещ", desc: "Бавно готвено, билково булгур ризото", price: "42", alt: "Бавно печено млечно агнешко по традиционна рецепта" },
  ],
  "ВИНА": [
    { id: 4, name: "Mavro-Dafne", desc: "Дълбок рубинен цвят, нотки на дъб", price: "12", alt: "Червено вино Mavro-Dafne селекция BABA" },
    { id: 5, name: "Balkan White", desc: "Купаж от местни сортове", price: "11", alt: "Бяло вино от балкански сортове грозде" },
  ],
  "КОКТЕЙЛИ": [
    { id: 6, name: "Balkan Negroni", desc: "Мурсалски чай, вермут, кампари", price: "18", alt: "Авторски коктейл Negroni с мурсалски чай" },
  ]
};

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("ХРАНА");

  // Контейнер за stagger анимация на децата
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Всяко следващо ястие се появява с 0.1 сек закъснение
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <main className="bg-[#F5F2ED] min-h-screen pt-32 lg:pt-48 pb-24 px-12 lg:px-24 text-[#212121]">
      {/* SEO Title (скрит за потребителя, но видим за търсачки) */}
      <h1 className="sr-only">Меню на Ресторант BABA - Авторска Балканска Кухня</h1>

      <div className="container mx-auto max-w-6xl">
        
        {/* ЦЕНТРАЛНО ЗАГЛАВИЕ */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl lg:text-8xl font-serif italic uppercase tracking-tighter mb-8">
              Меню<span className="text-[#722F37]">.</span>
            </h2>
          </motion.div>
          
          {/* ТАБОВЕ С КЛАВИАТУРНА ДОСТЪПНОСТ */}
          <nav className="flex justify-center gap-12 border-b border-[#212121]/10 pb-4" aria-label="Категории меню">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveTab(cat)}
                className="relative group py-2 outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:ring-offset-4"
                aria-pressed={activeTab === cat}
              >
                <span className={`text-[11px] font-bold tracking-[0.4em] transition-colors duration-500 
                  ${activeTab === cat ? "text-[#722F37]" : "text-[#212121]/40"}`}>
                  {cat}
                </span>
                {/* Анимирана червена линия от ляво на дясно */}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#722F37] transition-transform duration-500 
                  ${activeTab === cat ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 origin-left"}`} 
                />
              </button>
            ))}
          </nav>
        </div>

        {/* СПИСЪК С КАРТИ И STAGGER ЕФЕКТ */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12"
            >
              {menuData[activeTab].map((item) => (
                <motion.div 
                  key={item.id} 
                  variants={itemVariants}
                  className="group border-b border-[#212121]/5 pb-8 hover:border-[#722F37]/30 transition-colors cursor-default"
                >
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="text-2xl font-serif italic uppercase tracking-tight group-hover:text-[#722F37] transition-colors duration-500">
                      {item.name}
                    </h3>
                    <span className="text-sm font-bold opacity-30 tracking-tighter" aria-label={`Цена: ${item.price} лева`}>
                      {item.price} лв
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#212121]/50 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ДЕКОРАТИВЕН ЕЛЕМЕНТ - SEO ALT TAG ДОБАВЕН */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          className="mt-40 flex justify-center"
        >
          <Image 
            src="/logo.svg" 
            alt="BABA Balkan Artfood Logo Decor" 
            width={150} 
            height={150} 
            className="grayscale"
          />
        </motion.div>
      </div>
    </main>
  );
}
