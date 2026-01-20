Вкусът <br className="hidden lg:block" /> на <br className="hidden lg:block" /> миналото
            </h3>
            <p className="hidden lg:block text-[#212121]/70 text-[18px] font-light italic leading-relaxed max-w-md border-l-2 border-[#722F37]/20 lg:pl-8">
              "Всяка чиния е разказ, писан преди два века, но прочетен днес с нови сетива."
            </p>
          </div>

          {/* IMAGES AREA */}
          <div className="w-full lg:w-[45%] relative">
            
            {/* MOBILE ONLY - EDGE TO EDGE WITHOUT HARSH BOX */}
            <div className="block lg:hidden w-screen overflow-visible relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <div 
                onScroll={handleMobileScroll}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 px-[10vw] pb-12 overflow-y-visible"
              >
                {dishes.map((dish) => (
                  <div 
                    key={`mob-${dish.id}`} 
                    className="snap-center shrink-0 w-[80vw] bg-white p-2 pb-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image src={dish.img} alt={dish.title} fill className="object-cover" />
                    </div>
                    <div className="mt-6 text-center">
                      <span className="text-[#212121]/50 font-serif italic text-[12px] tracking-[0.2em] uppercase">
                        {dish.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Dots */}
              <div className="flex justify-center gap-3 mt-0">
                {dishes.map((_, i) => (
                  <div key={i} className={`h-[1px] transition-all duration-500 ${activeIndex === i ? "w-8 bg-[#722F37]" : "w-3 bg-[#212121]/10"}`} />
                ))}
              </div>
            </div>

            {/* DESKTOP ONLY - ORIGINAL */}
            <div className="hidden lg:flex relative h-[80vh] w-full items-center justify-end">
              {dishes.map((dish, index) => (
                <div key={`dt-${dish.id}`} style={getDesktopStyle(index)} className="absolute lg:w-[400px] bg-white lg:p-4 lg:pb-20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] origin-bottom">
                  <div className="relative aspect-[3.5/5] overflow-hidden grayscale-[10%]">
                    <Image src={dish.img} alt={dish.title} fill className="object-cover" priority={index === 0} />
                  </div>
                  <div className="absolute lg:bottom-6 left-0 w-full text-center px-2">
                    <span className="text-[#212121]/60 font-serif italic lg:text-[14px] tracking-[0.2em] uppercase block truncate">{dish.title}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
