import AboutHero from "@/components/AboutHero";
import AboutContent from "@/components/AboutContent";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutContent />
      {/* Тук по-късно можеш да добавиш и секция с ценности или времева линия */}
    </main>
  );
}