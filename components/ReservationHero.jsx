"use client";

export default function ReservationHero() {
  return (
    <section className="bg-[#F5F2ED] pt-32 lg:pt-48 pb-12 px-6 lg:px-24">
      {/* items-center за центриране на мобилно */}
      <div className="container mx-auto flex flex-col items-center lg:items-start">
        
        {/* ЗАГЛАВИЕ 1: text-center за мобилно, lg:text-left за десктоп */}
        <h2 className="text-[#212121] uppercase tracking-[1em] text-[10px] font-bold mb-8 opacity-40 text-center lg:text-left">
          Резервации
        </h2>
        
        {/* ЗАГЛАВИЕ 2: text-center за мобилно */}
        <h1 className="text-[#212121] text-4xl md:text-6xl lg:text-[7vw] font-serif italic uppercase tracking-tighter leading-none text-center lg:text-left">
          Изберете Вашето <br />
          {/* ml-0 маха отместването на мобилно, за да е идеално центрирано */}
          <span className="text-[#722F37] ml-0 lg:ml-[10%]">място в историята</span>
        </h1>
        
      </div>
    </section>
  );
}
