import { Suspense } from "react";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <ContactSection />
      </Suspense>
    </main>
  );
}
