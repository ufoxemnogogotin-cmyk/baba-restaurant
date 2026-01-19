{/* --- MOBILE STICKY BAR (FIXED BOTTOM) --- */}
<AnimatePresence>
  {scrolled && !isOpen && !isTransitioning && (
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      // ПРОМЕНИ:
      // 1. Добавихме border-t за визуален завършек.
      // 2. Ползваме padding-bottom: env(safe-area-inset-bottom), за да вдигнем съдържанието,
      //    но background-ът (bg-white) ще отиде най-долу зад чертата.
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[110] bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.05)]"
      style={{
        // Това гарантира, че ако Safe Area е активна, бутоните се вдигат, но фонът остава
        paddingBottom: "env(safe-area-inset-bottom, 20px)" 
      }}
    >
      <div className="grid grid-cols-5 h-16 border-t border-[#212121]/5">
        
        {/* БУТОН 1 (ТЕЛЕФОН) */}
        <a href="tel:+359888000000" className="col-span-1 flex flex-col border-r border-[#212121]/5 active:bg-gray-100 h-16 transition-colors">
          <div className="h-full w-full flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="1.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
        </a>
        
        {/* БУТОН 2 (РЕЗЕРВАЦИЯ) */}
        <Link href="/reservation" className="col-span-3 flex flex-col group active:bg-[#212121] transition-colors duration-300 h-16">
          <div className="h-full w-full flex items-center justify-center">
            <span className="text-[#212121] group-active:text-white uppercase tracking-[0.4em] text-[11px] font-bold">BOOK A TABLE</span>
          </div>
        </Link>
        
        {/* БУТОН 3 (ЛОКАЦИЯ) */}
        <a href="https://goo.gl/maps/YOUR_LINK" target="_blank" rel="noopener noreferrer" className="col-span-1 flex flex-col border-l border-[#212121]/5 active:bg-gray-100 h-16 transition-colors">
          <div className="h-full w-full flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="1.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
        </a>
      </div>
    </motion.div>
  )}
</AnimatePresence>
