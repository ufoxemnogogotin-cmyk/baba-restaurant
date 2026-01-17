import Hero from "../components/Hero";
import KitchenGallery from "../components/KitchenGallery";
import LocationSection from "../components/LocationSection";
import EventsSection from "../components/EventsSection";
import AboutSnippet from "../components/AboutSnippet"; // Добавен импорт за новата секция

export default function Home() {
  return (
    <main className="bg-[#F5F2ED] min-h-screen">
      {/* 1. HERO СЕКЦИЯ - Първото впечатление */}
      <Hero />

      {/* 2. СЕКЦИЯ КУХНЯ - Фокус върху храната (Акцент Храна) */}
      <KitchenGallery />

      {/* 3. ЛОКАЦИЯ И ВИРТУАЛНА РАЗХОДКА - Интерактивен скрол */}
      <LocationSection />

      {/* 4. СЪБИТИЯ И ЧАСТНИ ПРИЕМИ - Дискретност и лукс (Бели покривки) */}
      <EventsSection />

      {/* 5. ЗА НАС (SNIPPET) - Наследие и история (1924) */}
      <AboutSnippet />
      
      {/* Опционално: Малък финален отстъп преди Footer */}
      <div className="h-[10vh] bg-[#F5F2ED]" />
    </main>
  );
}