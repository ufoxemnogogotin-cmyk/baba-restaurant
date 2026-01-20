"use client";

export default function ReservationHero() {
  return (
    // ПРОМЯНА: lg:pt-24 (беше pt-48), за да вдигнем текста нагоре на десктоп
    <section className="bg-[#F5F2ED] pt-32 lg:pt-24 pb-12 px-6 lg:px-24">
      
      {/* ПРОМЯНА: lg:pl-40 отмества целия текст надясно, за да съвпадне с композицията */}
      <div className="container mx-auto flex flex-col items-center lg:items-start lg:pl-25">
        
        {/* ЗАГЛАВИЕ 1 */}
        <h2 className="text-[#212121] uppercase tracking-[1em] text-[10px] font-bold mb-8 opacity-40 text-center lg:text-left">
          Резервации
        </h2>
        
        {/* ЗАГЛАВИЕ 2 */}
        <h1 className="text-[#212121] text-4xl md:text-6xl lg:text-[7vw] font-serif italic uppercase tracking-tighter leading-none text-center lg:text-left">
          Изберете Вашето <br />
          {/* ПРОМЯНА: lg:ml-[15%] за по-силна асиметрия на десктоп */}
          <span className="text-[#722F37] ml-0 lg:ml-[15%]">място в историята</span>
        </h1>
        
      </div>
    </section>
  );
}
