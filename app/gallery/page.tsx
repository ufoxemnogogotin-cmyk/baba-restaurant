import GalleryGrid from "@/components/GalleryGrid";

export default function GalleryPage() {
  return (
    <main className="bg-[#F5F2ED] min-h-screen pt-32 lg:pt-48 pb-24 px-6 lg:px-24">
      <div className="container mx-auto">
        
        {/* Заглавие на страницата */}
        <header className="mb-20 lg:ml-[10%]">
          <p className="text-[#212121] uppercase tracking-[1em] text-[10px] font-bold opacity-40 mb-4">
            Визуална история
          </p>
          <h1 className="text-[#212121] text-6xl lg:text-[8vw] font-serif italic uppercase tracking-tighter leading-none">
            Галерия<span className="text-[#722F37]">.</span>
          </h1>
        </header>

        {/* Рендърваме самия Grid */}
        <section className="lg:ml-[10%]">
          <GalleryGrid />
        </section>

      </div>
    </main>
  );
}